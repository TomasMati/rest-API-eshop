package com.eshop.mapper;

import com.eshop.dto.OrderDTO;
import com.eshop.dto.OrderItemDTO;
import com.eshop.dto.ProductDTO;
import com.eshop.entity.Order;
import com.eshop.entity.OrderItem;
import com.eshop.entity.Product;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class DTOMapper {

    private final ObjectMapper objectMapper;

    public DTOMapper(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    // --- Product Mappings ---

    public ProductDTO toProductDTO(Product product) {
        if (product == null)
            return null;

        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setDescription(product.getDescription());
        dto.setCategory(product.getCategory());
        dto.setSubcategory(product.getSubcategory());
        dto.setCatalogNumber(product.getCatalogNumber());
        dto.setAvailability(product.getAvailability());
        dto.setRating(product.getRating());
        dto.setReviewCount(product.getReviewCount());

        // Convert JSON string to List<String>
        if (product.getImages() != null && !product.getImages().isEmpty()) {
            try {
                List<String> images = objectMapper.readValue(product.getImages(), new TypeReference<List<String>>() {
                });
                dto.setImages(images);
            } catch (JsonProcessingException e) {
                // If parsing fails, return empty list or handle as needed
                dto.setImages(Collections.emptyList());
            }
        } else {
            dto.setImages(Collections.emptyList());
        }

        return dto;
    }

    public Product toProductEntity(ProductDTO dto) {
        if (dto == null)
            return null;

        Product product = new Product();
        product.setId(dto.getId()); // In case of update
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setDescription(dto.getDescription());
        product.setCategory(dto.getCategory());
        product.setSubcategory(dto.getSubcategory());
        product.setCatalogNumber(dto.getCatalogNumber());
        product.setAvailability(dto.getAvailability());
        product.setRating(dto.getRating());
        product.setReviewCount(dto.getReviewCount());

        // Convert List<String> back to JSON string
        if (dto.getImages() != null) {
            try {
                product.setImages(objectMapper.writeValueAsString(dto.getImages()));
            } catch (JsonProcessingException e) {
                product.setImages("[]");
            }
        } else {
            product.setImages("[]");
        }

        return product;
    }

    // --- Order Mappings ---

    public OrderDTO toOrderDTO(Order order) {
        if (order == null)
            return null;

        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setUserId(order.getUserId());
        dto.setCustomerName(order.getCustomerName());
        dto.setEmail(order.getEmail());
        dto.setPhone(order.getPhone());
        dto.setStreet(order.getStreet());
        dto.setCity(order.getCity());
        dto.setZip(order.getZip());
        dto.setCountry(order.getCountry());
        dto.setShippingMethod(order.getShippingMethod());
        dto.setShippingCost(order.getShippingCost());
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setPaymentCost(order.getPaymentCost());
        dto.setTotal(order.getTotal());
        dto.setStatus(order.getStatus());
        dto.setDate(order.getDate());

        if (order.getItems() != null) {
            dto.setItems(order.getItems().stream()
                    .map(this::toOrderItemDTO)
                    .collect(Collectors.toList()));
        } else {
            dto.setItems(Collections.emptyList());
        }

        return dto;
    }

    public OrderItemDTO toOrderItemDTO(OrderItem item) {
        if (item == null)
            return null;

        OrderItemDTO dto = new OrderItemDTO();
        dto.setId(item.getId());
        dto.setProductId(item.getProductId());
        dto.setName(item.getName());
        dto.setPrice(item.getPrice());
        dto.setQuantity(item.getQuantity());
        dto.setImage(item.getImage());
        return dto;
    }

    public Order toOrderEntity(OrderDTO dto) {
        if (dto == null)
            return null;

        Order order = new Order();
        order.setId(dto.getId());
        order.setUserId(dto.getUserId());
        order.setCustomerName(dto.getCustomerName());
        order.setEmail(dto.getEmail());
        order.setPhone(dto.getPhone());
        order.setStreet(dto.getStreet());
        order.setCity(dto.getCity());
        order.setZip(dto.getZip());
        order.setCountry(dto.getCountry());
        order.setShippingMethod(dto.getShippingMethod());
        order.setShippingCost(dto.getShippingCost());
        order.setPaymentMethod(dto.getPaymentMethod());
        order.setPaymentCost(dto.getPaymentCost());
        order.setTotal(dto.getTotal());
        order.setStatus(dto.getStatus());
        order.setDate(dto.getDate());

        if (dto.getItems() != null) {
            List<OrderItem> items = dto.getItems().stream()
                    .map(this::toOrderItemEntity)
                    .collect(Collectors.toList());
            order.setItems(items);
            items.forEach(item -> item.setOrder(order));
        }

        return order;
    }

    public OrderItem toOrderItemEntity(OrderItemDTO dto) {
        if (dto == null)
            return null;

        OrderItem item = new OrderItem();
        item.setId(dto.getId());
        item.setProductId(dto.getProductId());
        item.setName(dto.getName());
        item.setPrice(dto.getPrice());
        item.setQuantity(dto.getQuantity());
        item.setImage(dto.getImage());
        return item;
    }
}
