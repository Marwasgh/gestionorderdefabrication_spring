package com.example.productionReceiptfinal.repositories;

import com.example.productionReceiptfinal.entities.Machine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MachineRepository extends JpaRepository<Machine, Long> {
    Optional<Machine> findByEtat(String etat);
    List<Machine> findByEmployesIsNull();

}
