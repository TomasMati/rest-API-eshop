package com.eshop.controller;

import com.eshop.entity.Product;
import com.eshop.repository.ProductRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class ProductControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ProductRepository productRepository;

    private Product createProduct(String name, String catalogNumber) {
        Product product = new Product();
        product.setName(name);
        product.setCatalogNumber(catalogNumber);
        product.setDescription("Test Description");
        product.setPrice(99.99);
        product.setAvailability("Skladom");
        return product;
    }

    @Test
    void shouldGetAllProducts() throws Exception {
        productRepository.save(createProduct("Product A", "A123"));
        productRepository.save(createProduct("Product B", "B456"));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(greaterThanOrEqualTo(2))));
    }

    @Test
    void shouldGetProductById() throws Exception {
        Product savedProduct = productRepository.save(createProduct("Product C", "C789"));

        mockMvc.perform(get("/api/products/" + savedProduct.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Product C")))
                .andExpect(jsonPath("$.catalogNumber", is("C789")));
    }

    @Test
    void shouldSearchProducts() throws Exception {
        productRepository.save(createProduct("UniqueName", "U111"));

        mockMvc.perform(get("/api/products?search=Unique"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(1)))
                .andExpect(jsonPath("$.content[0].name", is("UniqueName")));
    }
}
