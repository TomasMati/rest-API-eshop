package com.eshop.repository;

import com.eshop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
        List<Product> findByCategory(String category);

        List<Product> findBySubcategory(String subcategory);

        List<Product> findByNameContainingIgnoreCase(String name);

        // Pagination methods
        org.springframework.data.domain.Page<Product> findByNameContainingIgnoreCase(String name,
                        org.springframework.data.domain.Pageable pageable);

        org.springframework.data.domain.Page<Product> findByCategory(String category,
                        org.springframework.data.domain.Pageable pageable);

        org.springframework.data.domain.Page<Product> findBySubcategory(String subcategory,
                        org.springframework.data.domain.Pageable pageable);

        boolean existsByCatalogNumber(String catalogNumber);

        boolean existsByCatalogNumberAndIdNot(String catalogNumber, Long id);
}
