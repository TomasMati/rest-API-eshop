package com.eshop.config;

import com.eshop.entity.User;
import com.eshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Override
        public void run(String... args) throws Exception {
                // 1. Admin User
                User admin = userRepository.findByEmail("admin@eshop.com").orElse(new User());
                admin.setName("Admin");
                admin.setEmail("admin@eshop.com");
                admin.setPassword(passwordEncoder.encode("admin"));
                admin.setRole("ADMIN");
                admin.setStreet("Admin Street 1");
                admin.setCity("Bratislava");
                admin.setZip("81101");
                admin.setCountry("Slovensko");
                userRepository.save(admin);
                System.out.println("Admin updated: admin@eshop.com");
        }
}
