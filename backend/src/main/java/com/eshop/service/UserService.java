package com.eshop.service;

import com.eshop.dto.UserDTO;
import com.eshop.entity.User;
import com.eshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private org.springframework.mail.javamail.JavaMailSender mailSender;

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDTO(user);
    }

    public UserDTO updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (userDetails.getName() != null)
            user.setName(userDetails.getName());
        if (userDetails.getEmail() != null)
            user.setEmail(userDetails.getEmail());
        if (userDetails.getRole() != null)
            user.setRole(userDetails.getRole());
        if (userDetails.getStreet() != null)
            user.setStreet(userDetails.getStreet());
        if (userDetails.getCity() != null)
            user.setCity(userDetails.getCity());
        if (userDetails.getZip() != null)
            user.setZip(userDetails.getZip());
        if (userDetails.getCountry() != null)
            user.setCountry(userDetails.getCountry());

        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }

        user = userRepository.save(user);
        return convertToDTO(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Autowired
    private com.eshop.repository.ProductRepository productRepository;

    public void addToWishlist(Long userId, Long productId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        com.eshop.entity.Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        user.getWishlist().add(product);
        userRepository.save(user);
    }

    public void removeFromWishlist(Long userId, Long productId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        com.eshop.entity.Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        user.getWishlist().remove(product);
        userRepository.save(user);
    }

    public java.util.Set<com.eshop.entity.Product> getWishlist(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getWishlist();
    }

    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setStreet(user.getStreet());
        dto.setCity(user.getCity());
        dto.setZip(user.getZip());
        dto.setCountry(user.getCountry());
        return dto;
    }

    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Používateľ s týmto emailom neexistuje."));

        String token = java.util.UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setResetTokenExpiry(java.time.LocalDateTime.now().plusHours(24));
        userRepository.save(user);

        // Send email
        String resetLink = "http://localhost:5173/reset-password?token=" + token;

        org.springframework.mail.SimpleMailMessage message = new org.springframework.mail.SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Obnova hesla - Eshop");
        message.setText("Dobrý deň " + user.getName() + ",\n\n" +
                "Požiadali ste o obnovu hesla. Kliknite na nasledujúci odkaz:\n" +
                resetLink + "\n\n" +
                "Ak ste o zmenu nežiadali, ignorujte tento email.\n\n" +
                "Tím Eshop");

        mailSender.send(message);

        log.info("Reset password email sent to {}", email);
    }

    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Neplatný token."));

        if (user.getResetTokenExpiry().isBefore(java.time.LocalDateTime.now())) {
            throw new RuntimeException("Token vypršal.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);
    }
}
