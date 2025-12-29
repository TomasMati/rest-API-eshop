package com.eshop.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDTO {
    private Long id;
    private Long userId;
    private String customerName;
    private String email;
    private String phone;

    private String street;
    private String city;
    private String zip;
    private String country;

    private String shippingMethod;
    private Double shippingCost;

    private String paymentMethod;
    private Double paymentCost;

    private Double total;
    private String status;
    private LocalDateTime date;

    private List<OrderItemDTO> items;
}
