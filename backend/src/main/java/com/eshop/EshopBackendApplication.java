package com.eshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class EshopBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(EshopBackendApplication.class, args);
    }
}
