package com.example.productionReceiptfinal.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employe")
public class Employe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String poste;

    @ManyToOne
    @JoinColumn(name = "machine_assignee")
    @JsonIgnoreProperties("employes") // Évite la boucle infinie
    private Machine machineAssignee;
}