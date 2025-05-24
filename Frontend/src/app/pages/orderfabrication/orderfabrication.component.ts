import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface OrdreFabrication {
  id?: number;
  quantite: number;
  date: string;
  etat?: string;
  produit: { id: number };
  machineAssignee: { id: number };
}

@Component({
  selector: 'ngx-orderfabrication',
  templateUrl: './orderfabrication.component.html',
  styleUrls: ['./orderfabrication.component.scss']
})
export class OrderfabricationComponent implements OnInit {
  ordres: any[] = [];
  machinesDisponibles: any[] = [];
  produits: any[] = [];
minDate: string;
  selectedProduitId: number | null = null;
  quantite = 0;
  date = '';
  selectedMachineId: number | null = null;
  showForm = false;

  etatsPossibles = ['EN_ATTENTE', 'EN_COURS', 'TERMINE'];
  modeEdition: { [id: number]: boolean } = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // Mois (de 0 à 11)
      const dd = String(today.getDate()).padStart(2, '0');
      this.minDate = `${yyyy}-${mm}-${dd}`;
    this.loadOrdres();
    this.loadMachinesDisponibles();
    this.loadProduits();
  }

  loadOrdres() {
    this.http.get<any[]>('http://localhost:8022/api/ordres').subscribe({
      next: data => {
        this.ordres = data;
        this.modeEdition = {}; // Reset mode d’édition
      },
      error: () => alert('Erreur lors du chargement des ordres')
    });
  }

  loadMachinesDisponibles() {
    this.http.get<any[]>('http://localhost:8022/api/ordres/machines/disponibles').subscribe({
      next: data => this.machinesDisponibles = data,
      error: () => alert('Erreur lors du chargement des machines disponibles')
    });
  }

  loadProduits() {
    this.http.get<any[]>('http://localhost:8022/api/produits').subscribe({
      next: data => this.produits = data,
      error: () => alert('Erreur lors du chargement des produits')
    });
  }

creerOrdre() {
  if (
    !this.selectedProduitId ||
    !this.quantite ||
    !this.date ||
    !this.selectedMachineId
  ) {
    alert('Tous les champs sont obligatoires !');
    return;
  }

  const ordre: OrdreFabrication = {
    quantite: this.quantite,
    date: this.date,
    produit: { id: this.selectedProduitId },
    machineAssignee: { id: this.selectedMachineId }
  };

  this.http.post('http://localhost:8022/api/ordres', ordre).subscribe({
    next: (response: any) => {
      alert(response?.message || 'Ordre créé avec succès !');
      this.loadOrdres();
      this.resetForm();
    },
    error: (err) => {
      const msg = err.error?.message || err.error+ "Quantité demandée  supérieure à la quantité en stock" || 'Erreur lors de la création de l\'ordre';
      alert(msg);
    }
  });
}

  resetForm() {
    this.selectedProduitId = null;
    this.quantite = 0;
    this.date = '';
    this.selectedMachineId = null;
    this.showForm = false;
  }

  supprimerOrdre(id: number) {
    if (confirm('Confirmer la suppression ?')) {
      this.http.delete(`http://localhost:8022/api/ordres/${id}`).subscribe({
        next: () => {
          alert('Ordre supprimé');
          this.loadOrdres();
        },
        error: () => alert('Erreur lors de la suppression')
      });
    }
  }

  activerEdition(id: number) {
    this.modeEdition[id] = true;
  }

  modifierEtat(id: number, nouvelEtat: string) {
    this.http.put(`http://localhost:8022/api/ordres/${id}/etat`, { etat: nouvelEtat }).subscribe({
      next: () => {
        this.modeEdition[id] = false;
        this.loadOrdres();
      },
      error: () => alert("Erreur lors de la modification de l'état")
    });
  }
}
