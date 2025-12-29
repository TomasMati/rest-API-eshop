package com.eshop.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String street;
    private String city;
    private String zip;
    private String country;
}
