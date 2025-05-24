import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { NumbereditorComponent } from '../numbereditor/numbereditor.component';

@Component({
  selector: 'ngx-produits-table',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss'],
})
export class ProduitsComponent {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
        addable: false,
      },
      nom: {
        title: 'Nom',
        type: 'string',
      },
      type: {
        title: 'Type',
        type: 'string',
      },
      stock: {
        title: 'Stock',
        type: 'number',
        renderComponent: NumbereditorComponent,
        editor: {
          type: 'custom',
          component: NumbereditorComponent,},
      },
      fournisseur: {
        title: 'Fournisseur',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private http: HttpClient) {
    this.loadProduits();
  }

  loadProduits(): void {
    this.http.get<any[]>('http://localhost:8022/api/produits').subscribe(data => {
      this.source.load(data);
    });
  }

  isValidInteger(value: any): boolean {
    // Vérifie que la valeur est un entier positif uniquement
    return /^\d+$/.test(value);
  }

  onCreateConfirm(event): void {
    const newProduit = event.newData;

    if (!this.isValidInteger(newProduit.stock)) {
      alert('❌ Le champ "stock" doit être un entier positif (ex: 1, 2, 10)');
      event.confirm.reject();
      return;
    }

    newProduit.stock = parseInt(newProduit.stock, 10);

    this.http.post('http://localhost:8022/api/produits', newProduit).subscribe({
       next: () => {
      event.confirm.resolve();
      this.loadProduits(); 
    },
      error: () => {
        alert("❌ Erreur lors de l'ajout du produit");
        event.confirm.reject();
      },
    });
  }

  onEditConfirm(event): void {
    const updatedProduit = event.newData;

    if (!this.isValidInteger(updatedProduit.stock)) {
      alert('❌ Le champ "stock" doit être un entier positif (ex: 1, 2, 10)');
      event.confirm.reject();
      return;
    }

    updatedProduit.stock = parseInt(updatedProduit.stock, 10);

    const id = event.data.id;

    this.http.put(`http://localhost:8022/api/produits/${id}`, updatedProduit).subscribe({
      next: () => event.confirm.resolve(),
      error: () => {
        alert("❌ Erreur lors de la mise à jour");
        event.confirm.reject();
      },
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      const id = event.data.id;
      this.http.delete(`http://localhost:8022/api/produits/${id}`).subscribe({
        next: () => event.confirm.resolve(),
        error: () => {
          alert("❌ Erreur lors de la suppression");
          event.confirm.reject();
        },
      });
    } else {
      event.confirm.reject();
    }
  }
}
