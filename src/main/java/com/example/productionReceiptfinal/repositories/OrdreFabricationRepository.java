package com.example.productionReceiptfinal.repositories;

import com.example.productionReceiptfinal.entities.OrdreFabrication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdreFabricationRepository extends JpaRepository<OrdreFabrication, Long> {
    List<OrdreFabrication> findByEtat(String etat);
}