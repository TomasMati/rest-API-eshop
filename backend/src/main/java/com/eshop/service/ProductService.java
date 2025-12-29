package com.eshop.service;

import com.eshop.entity.Product;
import com.eshop.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();

    Product getProductById(Long id);

    Product createProduct(Product product);

    Product updateProduct(Long id, Product product);

    void deleteProduct(Long id);

    List<Product> getProductsByCategory(String category);

    List<Product> getProductsBySubcategory(String subcategory);

    List<Product> searchProducts(String query, Double minPrice, Double maxPrice);

    Page<Product> getProducts(String search, Pageable pageable);

    Review addReview(Long productId, Long userId, String text, Integer rating);

    List<Review> getProductReviews(Long productId);
}
