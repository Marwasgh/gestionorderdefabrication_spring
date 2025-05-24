package com.example.productionReceiptfinal.services;

import com.example.productionReceiptfinal.dto.EmployeRequestDTO;
import com.example.productionReceiptfinal.entities.Employe;
import com.example.productionReceiptfinal.entities.Machine;
import com.example.productionReceiptfinal.entities.Utilisateur;
import com.example.productionReceiptfinal.repositories.EmployeRepository;
import com.example.productionReceiptfinal.repositories.MachineRepository;
import com.example.productionReceiptfinal.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Service
public class EmployeService {
    private final EmployeRepository repository;
    private final MachineRepository machineRepository;
    private final UserRepository utilisateurRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public EmployeService(EmployeRepository repository, MachineRepository machineRepository, UserRepository utilisateurRepository) {
        this.repository = repository;
        this.machineRepository = machineRepository;
        this.utilisateurRepository = utilisateurRepository;
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

  /*  public void delete(Long id) {
        repository.deleteById(id);
    }
*/
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

    @Transactional
    public Employe createWithUser(EmployeRequestDTO dto) {
        // Vérifier si la machine existe
        Machine machine = machineRepository.findById(dto.getMachineId())
                .orElseThrow(() -> new RuntimeException("Machine not found"));

        // Créer et sauvegarder l'utilisateur
        Utilisateur user = new Utilisateur();
        user.setNom(dto.getNom());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword())); // Hasher le mot de passe
        user.setRole("USER");

        Utilisateur savedUser = utilisateurRepository.save(user);

        // Créer et sauvegarder l'employé
        Employe employe = new Employe();
        employe.setNom(dto.getNom());
        employe.setPoste(dto.getPoste());
        employe.setMachineAssignee(machine);
        employe.setUtilisateur(savedUser);

        return repository.save(employe);
    }
    @Transactional
    public void delete(Long id) {
        Employe employe = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employé non trouvé"));

        Utilisateur utilisateur = employe.getUtilisateur();

        // Détacher l'utilisateur de l'employé
        if (utilisateur != null) {
            employe.setUtilisateur(null);
            repository.save(employe); // mettre à jour l'employé sans utilisateur
            utilisateurRepository.delete(utilisateur);
        }

        repository.delete(employe);
    }


}
