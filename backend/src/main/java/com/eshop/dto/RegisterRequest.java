package com.eshop.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    @jakarta.validation.constraints.NotBlank(message = "Meno je povinné")
    private String name;

    @jakarta.validation.constraints.NotBlank(message = "Email je povinný")
    @jakarta.validation.constraints.Email(message = "Neplatný formát emailu")
    private String email;

    @jakarta.validation.constraints.NotBlank(message = "Heslo je povinné")
    @jakarta.validation.constraints.Size(min = 4, message = "Heslo musí mať aspoň 4 znaky")
    private String password;

    private String phone;
}
