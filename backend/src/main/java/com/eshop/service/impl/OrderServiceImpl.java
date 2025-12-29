package com.eshop.service.impl;

import com.eshop.entity.Order;
import com.eshop.entity.OrderItem;
import com.eshop.repository.OrderRepository;
import com.eshop.repository.UserRepository;
import com.eshop.service.EmailService;
import com.eshop.service.OrderService;
import com.eshop.service.SmsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private SmsService smsService;

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public Order createOrder(Order order) {
        order.setDate(LocalDateTime.now());
        order.setStatus("PENDING");

        // Set order reference for all items
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                item.setOrder(order);
            }
        }

        // Update User Address if user is logged in
        if (order.getUserId() != null) {
            userRepository.findById(order.getUserId()).ifPresent(user -> {
                boolean changed = false;
                if (order.getStreet() != null && !order.getStreet().isEmpty()) {
                    user.setStreet(order.getStreet());
                    changed = true;
                }
                if (order.getCity() != null && !order.getCity().isEmpty()) {
                    user.setCity(order.getCity());
                    changed = true;
                }
                if (order.getZip() != null && !order.getZip().isEmpty()) {
                    user.setZip(order.getZip());
                    changed = true;
                }
                if (order.getCountry() != null && !order.getCountry().isEmpty()) {
                    user.setCountry(order.getCountry());
                    changed = true;
                }
                if (order.getPhone() != null && !order.getPhone().isEmpty()) {
                    user.setPhone(order.getPhone());
                    changed = true;
                }

                if (changed) {
                    userRepository.save(user);
                }
            });
        }

        Order savedOrder = orderRepository.save(order);

        // Sending email/sms might fail but shouldn't stop order creation in simple impl
        try {
            emailService.sendOrderConfirmationEmail(savedOrder);
        } catch (Exception e) {
            log.error("Failed to send confirmation email", e);
        }

        if (savedOrder.getPhone() != null) {
            smsService.sendSms(savedOrder.getPhone(),
                    "Vasa objednavka c. " + savedOrder.getId() + " bola prijata. Dakujeme!");
        }

        log.info("Order created: {}", savedOrder.getId());
        return savedOrder;
    }

    @Override
    public Order updateOrderStatus(Long id, String status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        return orderRepository.save(order);
    }
}
