package com.example.productionReceiptfinal.controllers;
import com.example.productionReceiptfinal.dto.EmployeRequestDTO;

import com.example.productionReceiptfinal.entities.Employe;
import com.example.productionReceiptfinal.entities.Machine;
import com.example.productionReceiptfinal.services.EmployeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // toutes les méthodes retournent directement des objets JSON.
@RequestMapping("/api/employes")
public class EmployeController {
    private final EmployeService service;

    public EmployeController(EmployeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Employe> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employe> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Employe> create(@RequestBody EmployeRequestDTO dto) {
        Employe employe = service.createWithUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(employe);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Employe> update(@PathVariable Long id, @RequestBody Employe employeDetails) {
        try {
            Employe updatedEmploye = service.update(id, employeDetails);
            return ResponseEntity.ok(updatedEmploye);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{employeId}/assignMachine/{machineId}")
    public ResponseEntity<Employe> assignMachineToEmploye(@PathVariable Long employeId, @PathVariable Long machineId) {
        Employe updatedEmploye = service.assignMachine(employeId, machineId);
        return ResponseEntity.ok(updatedEmploye);
    }

    @GetMapping("/machinesunassigned")
    public ResponseEntity<List<Machine>> getUnassignedMachines() {
        List<Machine> machines = service.getUnassignedMachines();
        return ResponseEntity.ok(machines);
    }


}