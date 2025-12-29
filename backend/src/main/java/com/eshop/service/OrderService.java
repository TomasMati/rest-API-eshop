package com.eshop.service;

import com.eshop.entity.Order;
import java.util.List;

public interface OrderService {
    List<Order> getAllOrders();

    Order getOrderById(Long id);

    List<Order> getOrdersByUserId(Long userId);

    Order createOrder(Order order);

    Order updateOrderStatus(Long id, String status);
}
