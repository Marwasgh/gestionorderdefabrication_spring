package com.example.productionReceiptfinal.services;

import com.example.productionReceiptfinal.entities.Employe;
import com.example.productionReceiptfinal.entities.Machine;
import com.example.productionReceiptfinal.repositories.EmployeRepository;
import com.example.productionReceiptfinal.repositories.MachineRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MachineService {
    private final MachineRepository repository;
    private final EmployeRepository employeRepository;

    public MachineService(MachineRepository repository, EmployeRepository employeRepository) {
        this.repository = repository;
        this.employeRepository = employeRepository;
    }

    public List<Machine> getAll() {
        return repository.findAll();
    }

    public Optional<Machine> getById(Long id) {
        return repository.findById(id);
    }

    public Machine create(Machine machine) {
        return repository.save(machine);
    }

    public Machine update(Long id, Machine machineDetails) {
        return repository.findById(id).map(machine -> {
            machine.setNom(machineDetails.getNom());
            machine.setEtat(machineDetails.getEtat());
            machine.setDerniereMaintenance(machineDetails.getDerniereMaintenance());
            return repository.save(machine);
        }).orElseThrow(() -> new RuntimeException("Machine non trouvée"));
    }

    /*public void delete(Long id) {
        repository.deleteById(id);
    }*/
    public void delete(Long id) {
        Optional<Machine> machineOpt = repository.findById(id);

        if (machineOpt.isPresent()) {
            Machine machine = machineOpt.get();

            // Désaffecter les employés avant de supprimer la machine
            employeRepository.findByMachineAssignee(machine).forEach(employe -> {
                employe.setMachineAssignee(null);
                employeRepository.save(employe);
            });

            repository.deleteById(id);
        } else {
            throw new RuntimeException("Machine non trouvée");
        }
    }


    @Transactional
    public Machine updateMachineState(Long id, String newEtat) {
        // Récupérer la machine par son ID
        Machine machine = repository.findById(id).orElseThrow(() -> new RuntimeException("Machine non trouvée"));

        // Si l'état est "en maintenance", désaffecter les employés
        if (newEtat.equalsIgnoreCase("En maintenance")) {
            // Trouver tous les employés affectés à cette machine et les désaffecter
            employeRepository.findByMachineAssignee(machine).forEach(employe -> {
                employe.setMachineAssignee(null);  // Désaffecter la machine de l'employé
                employeRepository.save(employe);
            });
        }

        // Modifier l'état de la machine
        machine.setEtat(newEtat);

        // Sauvegarder la machine mise à jour
        return repository.save(machine);
    }
    public List<Employe> getEmployesNonAssignes() {
        return employeRepository.findByMachineAssigneeIsNull();
    }
}