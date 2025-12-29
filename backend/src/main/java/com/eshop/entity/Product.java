package com.eshop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;

    @Column(length = 2000)
    private String description;

    private String category;
    private String subcategory;

    @Column(length = 1000)
    private String images; // JSON array as string

    private Double rating;
    private Integer reviewCount;

    @Column(unique = true)
    private String catalogNumber;
    private String availability; // "Skladom" or "Na objednávku"

}
