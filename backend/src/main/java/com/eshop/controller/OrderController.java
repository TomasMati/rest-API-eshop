package com.eshop.controller;

import com.eshop.entity.Order;
import com.eshop.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin()
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private com.eshop.mapper.DTOMapper dtoMapper;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<com.eshop.dto.OrderDTO>> getAllOrders() {
        List<com.eshop.dto.OrderDTO> dtos = orderService.getAllOrders().stream()
                .map(dtoMapper::toOrderDTO)
                .collect(java.util.stream.Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<com.eshop.dto.OrderDTO> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(dtoMapper.toOrderDTO(orderService.getOrderById(id)));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<com.eshop.dto.OrderDTO>> getOrdersByUserId(@PathVariable Long userId) {
        List<com.eshop.dto.OrderDTO> dtos = orderService.getOrdersByUserId(userId).stream()
                .map(dtoMapper::toOrderDTO)
                .collect(java.util.stream.Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<com.eshop.dto.OrderDTO> createOrder(
            @jakarta.validation.Valid @RequestBody com.eshop.dto.OrderDTO orderDTO) {
        Order order = dtoMapper.toOrderEntity(orderDTO);
        Order createdOrder = orderService.createOrder(order);
        return ResponseEntity.ok(dtoMapper.toOrderDTO(createdOrder));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<com.eshop.dto.OrderDTO> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        String status = request.get("status");
        return ResponseEntity.ok(dtoMapper.toOrderDTO(orderService.updateOrderStatus(id, status)));
    }
}
