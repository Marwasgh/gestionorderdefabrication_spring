package com.example.productionReceiptfinal.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "produit")
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String type;
    private int stock;
    private String fournisseur;

    @OneToMany(mappedBy = "produit", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("produit")
    private List<OrdreFabrication> ordresFabrication;
}