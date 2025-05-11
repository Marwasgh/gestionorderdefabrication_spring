package com.example.productionReceiptfinal.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "machine")
public class Machine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String etat;
    private LocalDate derniereMaintenance;

    @OneToMany(mappedBy = "machineAssignee", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("machineAssignee") // Évite la boucle infinie dans JSON
    private List<Employe> employes;
}