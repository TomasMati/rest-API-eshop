package com.eshop.service;

import com.eshop.entity.Category;
import com.eshop.entity.Subcategory;
import com.eshop.repository.CategoryRepository;
import com.eshop.repository.SubcategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SubcategoryRepository subcategoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category createCategory(String name) {
        Category category = new Category();
        category.setName(name);
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    public Subcategory addSubcategory(Long categoryId, String name) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Subcategory subcategory = new Subcategory();
        subcategory.setName(name);
        subcategory.setCategory(category);

        return subcategoryRepository.save(subcategory);
    }

    public void deleteSubcategory(Long subcategoryId) {
        subcategoryRepository.deleteById(subcategoryId);
    }
}
