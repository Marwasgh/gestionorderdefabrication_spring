package com.example.productionReceiptfinal.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ordrefabrication")
public class OrdreFabrication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projet;

    @ManyToOne
    @JoinColumn(name = "produit_id")
    private Produit produit;

    private int quantite;
    private LocalDate date;
    private String etat;

    @ManyToOne
    @JoinColumn(name = "machine_id")
    @JsonIgnoreProperties("ordres")
    private Machine machineAssignee;
}