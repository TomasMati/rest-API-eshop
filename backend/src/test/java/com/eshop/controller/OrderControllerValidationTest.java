package com.eshop.controller;

import com.eshop.entity.Order;
import com.eshop.entity.OrderItem;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class OrderControllerValidationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private Order createValidOrder() {
        Order order = new Order();
        order.setCustomerName("Jan Novak");
        order.setEmail("jan@novak.sk");
        order.setPhone("+421944123456"); // Valid
        order.setStreet("Hlavna 1");
        order.setCity("Kosice");
        order.setZip("040 01"); // Valid
        order.setCountry("Slovensko");
        order.setShippingMethod("Kurier");
        order.setPaymentMethod("Karta");
        order.setTotal(100.0);
        order.setDate(LocalDateTime.now());
        order.setStatus("PENDING");

        List<OrderItem> items = new ArrayList<>();
        // Items are not strictly validated by @Valid itself unless @Valid is on the
        // list,
        // but let's add one for realism
        order.setItems(items);
        return order;
    }

    @Test
    void shouldCreateOrderWithValidData() throws Exception {
        Order order = createValidOrder();

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(order)))
                .andExpect(status().isOk());
    }

    @Test
    void shouldFailOrderWithInvalidEmail() throws Exception {
        Order order = createValidOrder();
        order.setEmail("not-email"); // Invalid

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(order)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldFailOrderWithInvalidPhone() throws Exception {
        Order order = createValidOrder();
        order.setPhone("123"); // Too short, regex expects 9-15

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(order)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldFailOrderWithInvalidZip() throws Exception {
        Order order = createValidOrder();
        order.setZip("123456"); // No space, or too long maybe? Regex is pretty strict: ^\d{3}\s?\d{2}$

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(order)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldFailOrderWithMissingRequiredField() throws Exception {
        Order order = createValidOrder();
        order.setCustomerName(null); // @NotBlank

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(order)))
                .andExpect(status().isBadRequest());
    }
}
