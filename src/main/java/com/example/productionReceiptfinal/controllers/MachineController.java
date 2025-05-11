package com.example.productionReceiptfinal.controllers;


import com.example.productionReceiptfinal.entities.Employe;
import com.example.productionReceiptfinal.entities.Machine;
import com.example.productionReceiptfinal.services.MachineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/machines")
public class MachineController {
    private final MachineService service;

    public MachineController(MachineService service) {
        this.service = service;
    }

    @GetMapping
    public List<Machine> getAll() {
        return service.getAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Machine> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Machine create(@RequestBody Machine machine) {
        return service.create(machine);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Machine> update(@PathVariable Long id, @RequestBody Machine machineDetails) {
        try {
            Machine updatedMachine = service.update(id, machineDetails);
            return ResponseEntity.ok(machineDetails);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/etat")
    public ResponseEntity<?> updateMachineState(@PathVariable Long id, @RequestParam String newEtat) {
        try {
            service.updateMachineState(id, newEtat);
            return ResponseEntity.ok("État de la machine mis à jour avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Machine non trouvée");
        }
    }
    
    @GetMapping("/employes/nonassignes")
    public ResponseEntity<List<Employe>> getEmployesNonAssignes() {
        List<Employe> employesNonAssignes = service.getEmployesNonAssignes();
        return ResponseEntity.ok(employesNonAssignes);
    }

}
