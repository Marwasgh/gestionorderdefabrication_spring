package com.example.productionReceiptfinal.repositories;

import com.example.productionReceiptfinal.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Utilisateur, Long> {

    List<Utilisateur> findByRole(String role);

    Optional<Utilisateur> findByEmail(String email);
    boolean existsByEmail(String email);

}