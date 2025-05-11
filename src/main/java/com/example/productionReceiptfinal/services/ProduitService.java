package com.example.productionReceiptfinal.services;

import com.example.productionReceiptfinal.entities.Produit;
import com.example.productionReceiptfinal.repositories.ProduitRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProduitService {
    private final ProduitRepository repository;

    public ProduitService(ProduitRepository repository) {
        this.repository = repository;
    }

    public List<Produit> getAll() {
        return repository.findAll();
    }

    public Produit getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Produit create(Produit produit) {
        return repository.save(produit);
    }

    public Produit update(Long id, Produit produitDetails) {
        Optional<Produit> optionalProduit = repository.findById(id);
        if (optionalProduit.isPresent()) {
            Produit produit = optionalProduit.get();
            produit.setNom(produitDetails.getNom());
            produit.setType(produitDetails.getType());
            produit.setStock(produitDetails.getStock());
            produit.setFournisseur(produitDetails.getFournisseur());
            return repository.save(produit);
        }
        return null;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
