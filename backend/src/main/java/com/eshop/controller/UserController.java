package com.eshop.controller;

import com.eshop.dto.UserDTO;
import com.eshop.entity.User;
import com.eshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin()
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/wishlist")
    public ResponseEntity<java.util.Set<com.eshop.entity.Product>> getWishlist(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getWishlist(id));
    }

    @PostMapping("/{id}/wishlist/{productId}")
    public ResponseEntity<Void> addToWishlist(@PathVariable Long id, @PathVariable Long productId) {
        userService.addToWishlist(id, productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/wishlist/{productId}")
    public ResponseEntity<Void> removeFromWishlist(@PathVariable Long id, @PathVariable Long productId) {
        userService.removeFromWishlist(id, productId);
        return ResponseEntity.ok().build();
    }
}
