package com.eshop.controller;

import com.eshop.entity.Category;
import com.eshop.entity.Subcategory;
import com.eshop.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin()
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Category> createCategory(@RequestBody Map<String, String> request) {
        String name = request.get("name");
        return ResponseEntity.ok(categoryService.createCategory(name));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{categoryId}/subcategories")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Subcategory> addSubcategory(
            @PathVariable Long categoryId,
            @RequestBody Map<String, String> request) {
        String name = request.get("name");
        return ResponseEntity.ok(categoryService.addSubcategory(categoryId, name));
    }

    @DeleteMapping("/subcategories/{subcategoryId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteSubcategory(@PathVariable Long subcategoryId) {
        categoryService.deleteSubcategory(subcategoryId);
        return ResponseEntity.noContent().build();
    }
}
