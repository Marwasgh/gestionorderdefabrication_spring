package com.example.productionReceiptfinal.services;


import com.example.productionReceiptfinal.dto.SigninRequest;
import com.example.productionReceiptfinal.dto.SignupRequest;
import com.example.productionReceiptfinal.entities.Utilisateur;
import com.example.productionReceiptfinal.repositories.UserRepository;
import com.example.productionReceiptfinal.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Créer un nouvel utilisateur
    public Utilisateur createUser(Utilisateur user) {
        return userRepository.save(user);
    }

    // Obtenir tous les utilisateurs
    public List<Utilisateur> getAllUsers() {
        return userRepository.findAll();
    }

    // Obtenir un utilisateur par son ID
    public Optional<Utilisateur> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Mettre à jour un utilisateur
    public Utilisateur updateUser(Long id, Utilisateur updatedUser) {
        if (userRepository.existsById(id)) {
            updatedUser.setId(id);
            return userRepository.save(updatedUser);
        }
        return null;
    }

    // Supprimer un utilisateur
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Utilisateur> getUsersByRole(String role) {
        return userRepository.findByRole(role);
    }


    // Méthode pour créer un utilisateur avec un mot de passe hashé
    public Utilisateur signup(SignupRequest request) {
        Utilisateur user = new Utilisateur();
        user.setNom(request.getNom());
        user.setEmail(request.getEmail());

        // Hasher le mot de passe avant de l'enregistrer
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(hashedPassword);

        user.setRole(request.getRole());
        return userRepository.save(user);
    }
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    // Méthode pour authentifier un utilisateur
    public String signin(SigninRequest request) {
        Optional<Utilisateur> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isPresent()) {
            Utilisateur user = optionalUser.get();

            // Vérifier si le mot de passe correspond au hash stocké
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return jwtUtil.generateToken(user.getEmail());
            }
        }
        return null;
    }
    public String getEmailFromToken(String token) {
        return jwtUtil.extractEmail(token);
    }

    public Optional<Utilisateur> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Utilisateur findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public Utilisateur save(Utilisateur user) {
        return userRepository.save(user);
    }

}