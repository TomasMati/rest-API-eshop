package com.eshop.controller;

import com.eshop.entity.Product;
import com.eshop.service.FileStorageService;
import com.eshop.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin()
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private com.eshop.mapper.DTOMapper dtoMapper;

    @Autowired
    private com.eshop.repository.ProductRepository productRepository;

    @GetMapping("/check-catalog-number")
    public ResponseEntity<Boolean> checkCatalogNumber(@RequestParam String value,
            @RequestParam(required = false) Long id) {
        if (id != null) {
            return ResponseEntity.ok(productRepository.existsByCatalogNumberAndIdNot(value, id));
        }
        return ResponseEntity.ok(productRepository.existsByCatalogNumber(value));
    }

    @GetMapping
    public ResponseEntity<?> getAllProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @org.springframework.data.web.PageableDefault(size = 20) org.springframework.data.domain.Pageable pageable) {

        if (minPrice != null || maxPrice != null) {
            List<com.eshop.dto.ProductDTO> dtos = productService.searchProducts(search, minPrice, maxPrice)
                    .stream()
                    .map(dtoMapper::toProductDTO)
                    .collect(java.util.stream.Collectors.toList());
            return ResponseEntity.ok(dtos);
        }

        org.springframework.data.domain.Page<com.eshop.entity.Product> page = productService.getProducts(search,
                pageable);
        org.springframework.data.domain.Page<com.eshop.dto.ProductDTO> dtoPage = page.map(dtoMapper::toProductDTO);
        return ResponseEntity.ok(dtoPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<com.eshop.dto.ProductDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(dtoMapper.toProductDTO(productService.getProductById(id)));
    }

    @GetMapping("/{id}/reviews")
    public ResponseEntity<List<com.eshop.entity.Review>> getProductReviews(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductReviews(id));
    }

    @PostMapping("/{id}/reviews")
    public ResponseEntity<com.eshop.entity.Review> addReview(
            @PathVariable Long id,
            @RequestBody java.util.Map<String, Object> payload) {
        Long userId = ((Number) payload.get("userId")).longValue();
        String text = (String) payload.get("text");
        Integer rating = (Integer) payload.get("rating");

        return ResponseEntity.ok(productService.addReview(id, userId, text, rating));
    }

    @PostMapping
    public ResponseEntity<com.eshop.dto.ProductDTO> createProduct(
            @RequestParam("product") String productJson,
            @RequestParam(value = "images", required = false) MultipartFile[] images) {
        try {
            com.eshop.dto.ProductDTO productDTO = objectMapper.readValue(productJson, com.eshop.dto.ProductDTO.class);

            if (images != null && images.length > 0) {
                // Initialize list if null
                if (productDTO.getImages() == null) {
                    productDTO.setImages(new ArrayList<>());
                }

                // We don't need to parse, productDTO.getImages() is already a List
                // If the incoming JSON had existing images, they are already in the list.

                for (MultipartFile image : images) {
                    String imagePath = fileStorageService.storeFile(image);
                    productDTO.getImages().add(imagePath);
                }
            }

            com.eshop.entity.Product product = dtoMapper.toProductEntity(productDTO);
            com.eshop.entity.Product createdProduct = productService.createProduct(product);

            return ResponseEntity.ok(dtoMapper.toProductDTO(createdProduct));
        } catch (Exception e) {
            throw new RuntimeException("Error creating product: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<com.eshop.dto.ProductDTO> updateProduct(
            @PathVariable Long id,
            @RequestParam("product") String productJson,
            @RequestParam(value = "images", required = false) MultipartFile[] images) {
        try {
            com.eshop.dto.ProductDTO productDTO = objectMapper.readValue(productJson, com.eshop.dto.ProductDTO.class);

            if (images != null && images.length > 0) {
                if (productDTO.getImages() == null) {
                    productDTO.setImages(new ArrayList<>());
                }

                for (MultipartFile image : images) {
                    String imagePath = fileStorageService.storeFile(image);
                    productDTO.getImages().add(imagePath);
                }
            }

            // We update specific fields via service, but service takes Entity.
            // We map DTO to a temporary entity
            com.eshop.entity.Product requestEntity = dtoMapper.toProductEntity(productDTO);

            // Service updateProduct updates the existing product with values from
            // requestEntity
            com.eshop.entity.Product updatedProduct = productService.updateProduct(id, requestEntity);

            return ResponseEntity.ok(dtoMapper.toProductDTO(updatedProduct));
        } catch (Exception e) {
            throw new RuntimeException("Error updating product: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
