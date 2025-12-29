package com.eshop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @jakarta.validation.constraints.NotBlank(message = "Meno je povinné")
    @Column(nullable = false)
    private String customerName;

    @jakarta.validation.constraints.NotBlank(message = "Email je povinný")
    @jakarta.validation.constraints.Email(message = "Neplatný formát emailu")
    @Column(nullable = false)
    private String email;

    @jakarta.validation.constraints.Pattern(regexp = "^\\+?[0-9]{9,15}$", message = "Neplatné telefónne číslo")
    private String phone;

    @Column(length = 500)
    private String address; // Full formatted address (kept for backward compatibility or easy display)

    @jakarta.validation.constraints.NotBlank(message = "Ulica je povinná")
    private String street;

    @jakarta.validation.constraints.NotBlank(message = "Mesto je povinné")
    private String city;

    @jakarta.validation.constraints.NotBlank(message = "PSČ je povinné")
    @jakarta.validation.constraints.Pattern(regexp = "^\\d{3}\\s?\\d{2}$", message = "Neplatné PSČ")
    private String zip;

    @jakarta.validation.constraints.NotBlank(message = "Krajina je povinná")
    private String country;

    @jakarta.validation.constraints.NotBlank(message = "Doprava je povinná")
    private String shippingMethod;
    private Double shippingCost;

    @jakarta.validation.constraints.NotBlank(message = "Platba je povinná")
    private String paymentMethod;
    private Double paymentCost;

    @jakarta.validation.constraints.NotNull(message = "Celková suma je povinná")
    @Column(nullable = false)
    private Double total;

    @Column(nullable = false)
    private String status; // PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED

    @Column(nullable = false)
    private LocalDateTime date;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items;
}
