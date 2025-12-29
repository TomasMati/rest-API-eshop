package com.eshop.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private Double price;
    private String description;
    private String category;
    private String subcategory;
    private String catalogNumber;
    private String availability;
    private List<String> images;
    private Double rating;
    private Integer reviewCount;
}
