package com.eshop.service.impl;

import com.eshop.entity.Product;
import com.eshop.entity.Review;
import com.eshop.repository.ProductRepository;
import com.eshop.repository.ReviewRepository;
import com.eshop.repository.UserRepository;
import com.eshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public Product createProduct(Product product) {
        if (product.getCatalogNumber() != null && productRepository.existsByCatalogNumber(product.getCatalogNumber())) {
            throw new IllegalArgumentException(
                    "Product with catalog number " + product.getCatalogNumber() + " already exists.");
        }
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);

        if (productDetails.getCatalogNumber() != null &&
                productRepository.existsByCatalogNumberAndIdNot(productDetails.getCatalogNumber(), id)) {
            throw new IllegalArgumentException(
                    "Product with catalog number " + productDetails.getCatalogNumber() + " already exists.");
        }

        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());
        product.setDescription(productDetails.getDescription());
        product.setCategory(productDetails.getCategory());
        product.setSubcategory(productDetails.getSubcategory());

        if (productDetails.getImages() != null) {
            product.setImages(productDetails.getImages());
        }

        if (productDetails.getCatalogNumber() != null) {
            product.setCatalogNumber(productDetails.getCatalogNumber());
        }

        if (productDetails.getAvailability() != null) {
            product.setAvailability(productDetails.getAvailability());
        }

        product.setRating(productDetails.getRating());
        product.setReviewCount(productDetails.getReviewCount());

        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }

    @Override
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    @Override
    public List<Product> getProductsBySubcategory(String subcategory) {
        return productRepository.findBySubcategory(subcategory);
    }

    @Override
    public List<Product> searchProducts(String query, Double minPrice, Double maxPrice) {
        List<Product> products;
        if (query != null && !query.trim().isEmpty()) {
            products = productRepository.findByNameContainingIgnoreCase(query);
        } else {
            products = productRepository.findAll();
        }

        if (minPrice != null) {
            products = products.stream().filter(p -> p.getPrice() >= minPrice).toList();
        }
        if (maxPrice != null) {
            products = products.stream().filter(p -> p.getPrice() <= maxPrice).toList();
        }
        return products;
    }

    @Override
    public Page<Product> getProducts(String search, Pageable pageable) {
        if (search != null && !search.isEmpty()) {
            return productRepository.findByNameContainingIgnoreCase(search, pageable);
        }
        return productRepository.findAll(pageable);
    }

    @Override
    public Review addReview(Long productId, Long userId, String text, Integer rating) {
        Product product = getProductById(productId);
        com.eshop.entity.User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Review review = new Review();
        review.setProduct(product);
        review.setUser(user);
        review.setText(text);
        review.setRating(rating);
        review.setDate(LocalDateTime.now());

        reviewRepository.save(review);

        // Update product statistics
        List<Review> reviews = reviewRepository.findByProductId(productId);
        double avg = reviews.stream().mapToInt(Review::getRating).average().orElse(0.0);
        product.setRating(avg);
        product.setReviewCount(reviews.size());
        productRepository.save(product);

        return review;
    }

    @Override
    public List<Review> getProductReviews(Long productId) {
        return reviewRepository.findByProductId(productId);
    }
}
