package com.example.productionReceiptfinal.services;


import com.example.productionReceiptfinal.entities.Machine;
import com.example.productionReceiptfinal.entities.OrdreFabrication;
import com.example.productionReceiptfinal.entities.Produit;
import com.example.productionReceiptfinal.repositories.MachineRepository;
import com.example.productionReceiptfinal.repositories.OrdreFabricationRepository;
import com.example.productionReceiptfinal.repositories.ProduitRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrdreFabricationService {
    private final OrdreFabricationRepository repository;
    private final MachineRepository machineRepository;
    private  final ProduitRepository produitRepository;

    public OrdreFabricationService(OrdreFabricationRepository repository, MachineRepository machineRepository, ProduitRepository produitRepository) {
        this.repository = repository;
        this.machineRepository = machineRepository;
        this.produitRepository = produitRepository;
    }

    public List<OrdreFabrication> getAll() {
        return repository.findAll();
    }

    public Optional<OrdreFabrication> getById(Long id) {
        return repository.findById(id);
    }
    public OrdreFabrication create(OrdreFabrication ordre) {
        // Vérifier que la machine existe
        Optional<Machine> machineOpt = machineRepository.findById(ordre.getMachineAssignee().getId());
        if (!machineOpt.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Machine non trouvée.");
        }

        Machine machine = machineOpt.get();
        if (!"Disponible".equals(machine.getEtat())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La machine est déjà affectée ou en maintenance.");
        }

        // Vérifier la quantité de produit disponible
        Optional<Produit> produitOpt = produitRepository.findById(ordre.getProduit().getId());
        if (!produitOpt.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Produit non trouvé.");
        }

        Produit produit = produitOpt.get();
        if (produit.getStock() < ordre.getQuantite()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Quantité demandée (" + ordre.getQuantite() +
                            ") supérieure à la quantité en stock (" + produit.getStock() + ")."
            );
        }

        // Mettre à jour l'état de la machine
        machine.setEtat("Non Disponible");
        machineRepository.save(machine);

        ordre.setMachineAssignee(machine);
        return repository.save(ordre);
    }
    public Optional<OrdreFabrication> update(Long id, OrdreFabrication ordre) {
        return repository.findById(id).map(existingOrdre -> {
            existingOrdre.setProjet(ordre.getProjet());
            existingOrdre.setProduit(ordre.getProduit());
            existingOrdre.setQuantite(ordre.getQuantite());
            existingOrdre.setDate(ordre.getDate());
            existingOrdre.setEtat(ordre.getEtat());
            existingOrdre.setMachineAssignee(ordre.getMachineAssignee());

            // Vérifier si l'état est "Terminé" ou "Annulé"
            if ("Terminé".equalsIgnoreCase(ordre.getEtat()) || "Annulé".equalsIgnoreCase(ordre.getEtat())) {
                Machine machine = existingOrdre.getMachineAssignee();
                if (machine != null) {
                    machine.setEtat("Disponible");
                    machineRepository.save(machine);
                }
            }

            return repository.save(existingOrdre);
        });
    }


   /* public boolean delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }*/
    public boolean delete(Long id) {
        Optional<OrdreFabrication> ordreOpt = repository.findById(id);

        if (ordreOpt.isPresent()) {
            OrdreFabrication ordre = ordreOpt.get();
            Machine machine = ordre.getMachineAssignee();

            // Rendre la machine disponible avant de supprimer l'ordre
            if (machine != null) {
                machine.setEtat("Disponible");
                machineRepository.save(machine);
            }

            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<OrdreFabrication> getByEtat(String etat) {
        return repository.findByEtat(etat);
    }
    public List<Machine> getMachinesDisponibles() {
        // Filtrer les machines qui sont disponibles
        return machineRepository.findAll().stream()
                .filter(machine -> "Disponible".equals(machine.getEtat()))
                .collect(Collectors.toList());
    }


    @Transactional
    public OrdreFabrication updateEtatOrdre(Long ordreId, String nouvelEtat) {
        OrdreFabrication ordre = repository.findById(ordreId)
                .orElseThrow(() -> new RuntimeException("OrdreFabrication non trouvé"));

        ordre.setEtat(nouvelEtat);

        // Si l'état est "Terminé" ou "Annulé", rendre la machine disponible
        if ("Terminé".equalsIgnoreCase(nouvelEtat) || "Annulé".equalsIgnoreCase(nouvelEtat)) {
            Machine machine = ordre.getMachineAssignee();
            if (machine != null) {
                machine.setEtat("Disponible");
                machineRepository.save(machine);
            }
        }

        return repository.save(ordre);
    }

}