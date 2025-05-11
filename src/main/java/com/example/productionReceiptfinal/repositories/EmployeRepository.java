package com.example.productionReceiptfinal.repositories;

import com.example.productionReceiptfinal.entities.Employe;
import com.example.productionReceiptfinal.entities.Machine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeRepository extends JpaRepository<Employe, Long> {
    List<Employe> findByMachineAssignee(Machine machine);
    List<Employe> findByMachineAssigneeIsNull();
}