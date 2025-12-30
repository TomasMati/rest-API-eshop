package com.eshop.controller;

import com.eshop.entity.Order;
import com.eshop.entity.OrderItem;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class OrderControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private com.eshop.repository.OrderRepository orderRepository;

    private Order createValidOrder() {
        Order order = new Order();
        order.setCustomerName("Jan Novak");
        order.setEmail("jan@novak.sk");
        order.setPhone("+421944123456");
        order.setStreet("Hlavna 1");
        order.setCity("Kosice");
        order.setZip("040 01");
        order.setCountry("Slovensko");
        order.setShippingMethod("Kurier");
        order.setPaymentMethod("Karta");
        order.setTotal(100.0);
        order.setDate(LocalDateTime.now());
        order.setStatus("PENDING");

        List<OrderItem> items = new ArrayList<>();
        order.setItems(items);
        return order;
    }

    @Test
    void shouldCreateOrderWithValidData() throws Exception {
        Order order = createValidOrder();

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(order)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.customerName", is("Jan Novak")))
                .andExpect(jsonPath("$.status", is("PENDING")));
    }

    @Test
    @WithMockUser
    void shouldGetOrderById() throws Exception {
        Order savedOrder = orderRepository.save(createValidOrder());

        mockMvc.perform(get("/api/orders/" + savedOrder.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(savedOrder.getId().intValue())))
                .andExpect(jsonPath("$.customerName", is("Jan Novak")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldUpdateOrderStatusAsAdmin() throws Exception {
        Order savedOrder = orderRepository.save(createValidOrder());

        mockMvc.perform(put("/api/orders/" + savedOrder.getId() + "/status")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"status\": \"SHIPPED\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("SHIPPED")));
    }

    @Test
    void shouldFailUpdateOrderStatusWithoutAdmin() throws Exception {
        Order savedOrder = orderRepository.save(createValidOrder());

        mockMvc.perform(put("/api/orders/" + savedOrder.getId() + "/status")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"status\": \"SHIPPED\"}"))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldFailOrderWithInvalidEmail() throws Exception {
        Order order = createValidOrder();
        order.setEmail("not-email");

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(order)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldFailOrderWithInvalidPhone() throws Exception {
        Order order = createValidOrder();
        order.setPhone("123");

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(order)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldFailOrderWithInvalidZip() throws Exception {
        Order order = createValidOrder();
        order.setZip("123456");

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(order)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldFailOrderWithMissingRequiredField() throws Exception {
        Order order = createValidOrder();
        order.setCustomerName(null);

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(order)))
                .andExpect(status().isBadRequest());
    }
}
