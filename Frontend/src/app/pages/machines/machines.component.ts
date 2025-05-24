import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { DatepickerEditorComponent } from '../datepicker-editor/datepicker-editor.component';


@Component({
  selector: 'ngx-smart-table',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss'],
})
export class MachineComponent {
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
      // ID caché : non visible, non modifiable, non ajoutable
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
        addable: false,
        isVisible: false, // cette propriété n'est pas prise en compte par ng2-smart-table, donc on retire la colonne manuellement
      },
      nom: {
        title: 'Nom',
        type: 'string',
      },
      etat: {
        title: 'État',
        type: 'html',
        valuePrepareFunction: (etat: string) => {
          const color = etat.toLowerCase().includes('maintenance') ? 'red' : 'green';
          return `<span style="color: ${color}; font-weight: bold;">${etat}</span>`;
        },
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 'Disponible', title: 'Disponible' },
              { value: 'En service', title: 'En service' },
              { value: 'Non Disponible', title: 'Non Disponible' },
              { value: 'En maintenance', title: 'En maintenance' },
            ],
          },
        },
      },
      derniereMaintenance: {
        title: 'Dernière Maintenance',
        type: 'datetime', // pour afficher la date avec heure
        valuePrepareFunction: (date: string) => {
          const d = new Date(date);
          return d.toLocaleDateString();
        },
        editor: {
          type: 'custom',
          component: DatepickerEditorComponent, // composant personnalisé à créer
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private http: HttpClient) {
    this.loadMachines();
  }

  loadMachines(): void {
    this.http.get<any[]>('http://localhost:8022/api/machines').subscribe(data => {
      // Supprimer la propriété id de l'affichage (car isVisible ne fonctionne pas nativement)
      const transformed = data.map(({ id, ...rest }) => ({ ...rest, _id: id })); // si vous voulez conserver l'id pour usage interne
      this.source.load(data);
    });
  }

  onCreateConfirm(event): void {
    const newMachine = event.newData;
    this.http.post('http://localhost:8022/api/machines', newMachine).subscribe({
       next: () => {
      event.confirm.resolve();
      this.loadMachines();
    },
      error: () => {
        alert("Erreur lors de l'ajout de la machine");
        event.confirm.reject();
      },
    });
  }

  onEditConfirm(event): void {
    const updatedMachine = event.newData;
    const id = event.data.id;

    this.http.put(`http://localhost:8022/api/machines/${id}`, updatedMachine).subscribe({
      next: () => event.confirm.resolve(),
      error: () => {
        alert("Erreur lors de la mise à jour");
        event.confirm.reject();
      },
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette machine ?')) {
      const id = event.data.id;
      this.http.delete(`http://localhost:8022/api/machines/${id}`).subscribe({
        next: () => event.confirm.resolve(),
        error: () => event.confirm.reject(),
      });
    } else {
      event.confirm.reject();
    }
  }
}
