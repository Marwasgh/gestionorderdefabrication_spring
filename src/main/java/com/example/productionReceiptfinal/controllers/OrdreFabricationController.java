package com.example.productionReceiptfinal.controllers;

import com.example.productionReceiptfinal.entities.Machine;
import com.example.productionReceiptfinal.entities.OrdreFabrication;
import com.example.productionReceiptfinal.services.OrdreFabricationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ordres")
public class OrdreFabricationController {
    private final OrdreFabricationService service;

    public OrdreFabricationController(OrdreFabricationService service) {
        this.service = service;
    }

    @GetMapping
    public List<OrdreFabrication> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrdreFabrication> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping
    public OrdreFabrication create(@RequestBody OrdreFabrication ordre) {
        return service.create(ordre);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrdreFabrication> update(@PathVariable Long id, @RequestBody OrdreFabrication ordre) {
        return service.update(id, ordre)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (service.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/etat/{etat}")
    public List<OrdreFabrication> getByEtat(@PathVariable String etat) {
        return service.getByEtat(etat);  // Recherche des ordres par état
    }
    @GetMapping("/machines/disponibles")
    public List<Machine> getMachinesDisponibles() {
        // Filtrer les machines qui sont disponibles
        return service.getMachinesDisponibles();
    }

    @PutMapping("/{id}/etat")
    public ResponseEntity<OrdreFabrication> updateEtatOrdre(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        String nouvelEtat = request.get("etat");

        OrdreFabrication updatedOrdre = service.updateEtatOrdre(id, nouvelEtat);
        return ResponseEntity.ok(updatedOrdre);
    }
}