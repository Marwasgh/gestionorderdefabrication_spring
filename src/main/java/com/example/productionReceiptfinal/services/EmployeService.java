package com.example.productionReceiptfinal.services;

import com.example.productionReceiptfinal.entities.Employe;
import com.example.productionReceiptfinal.entities.Machine;
import com.example.productionReceiptfinal.repositories.EmployeRepository;
import com.example.productionReceiptfinal.repositories.MachineRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class EmployeService {
    private final EmployeRepository repository;
    private final MachineRepository machineRepository;

    public EmployeService(EmployeRepository repository, MachineRepository machineRepository) {
        this.repository = repository;
        this.machineRepository = machineRepository;
    }

    public List<Employe> getAll() {
        return repository.findAll();
    }

    public Optional<Employe> getById(Long id) {
        return repository.findById(id);
    }

    public Employe create(Employe employe) {
        return repository.save(employe);
    }

    public Employe update(Long id, Employe employeDetails) {
        return repository.findById(id).map(employe -> {
            employe.setNom(employeDetails.getNom());
            employe.setPoste(employeDetails.getPoste());
            employe.setMachineAssignee(employeDetails.getMachineAssignee());
            return repository.save(employe);
        }).orElseThrow(() -> new RuntimeException("Employé non trouvé"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Employe assignMachine(Long employeId, Long machineId) {
        Employe employe = repository.findById(employeId)
                .orElseThrow(() -> new RuntimeException("Employé non trouvé"));

        Machine machine = machineRepository.findById(machineId)
                .orElseThrow(() -> new RuntimeException("Machine non trouvée"));

        employe.setMachineAssignee(machine);

        return repository.save(employe);
    }

    public List<Machine> getUnassignedMachines() {
        return machineRepository.findByEmployesIsNull();
    }
}
