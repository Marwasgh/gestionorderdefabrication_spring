// import { Component, OnInit } from '@angular/core';
// import { EmployeService } from '../../services/EmployeService';
// import { MachineService } from '../../services/MachineService';
// import { LocalDataSource } from 'ng2-smart-table';

// @Component({
//   selector: 'ngx-employees',
//   templateUrl: './employees.component.html',
//   styleUrls: ['./employees.component.scss']
// })
// export class EmployeesComponent implements OnInit {
//   source: LocalDataSource = new LocalDataSource();
//   machineOptions: { value: number; title: string }[] = [];
//   settings: any = {};

//   constructor(
//     private employeService: EmployeService,
//     private machineService: MachineService
//   ) {}

//   ngOnInit(): void {
//     this.loadMachines();
//     this.loadEmployes();
//   }

//   loadMachines(): void {
//     this.machineService.getAvailableMachines().subscribe({
//       next: (machines) => {
//         this.machineOptions = machines.map((m: any) => ({
//           value: m.id,
//           title: m.nom
//         }));
//         this.initSettings();
//       },
//       error: () => alert('Erreur lors du chargement des machines')
//     });
//   }

//   initSettings(): void {
//     this.settings = {
//       actions: {
//         add: true,
//         edit: true,
//         delete: true,
//         position: 'left',               // <-- déplacer actions à gauche
//         columnTitle: 'Actions',
//        addButtonContent: '<i class="nb-plus"></i>',
//         editButtonContent: '<i class="nb-edit"></i>',
//         deleteButtonContent: '<i class="nb-trash"></i>',
//         saveButtonContent: '<i class="nb-checkmark"></i>',
//         cancelButtonContent: '<i class="nb-close"></i>',
//         confirmCreate: true,
//         confirmSave: true,
//         confirmDelete: true,
//       },
//       add: {
//         addButtonContent: '<i class="nb-plus"></i>',
//         createButtonContent: '<i class="nb-checkmark"></i>',
//         cancelButtonContent: '<i class="nb-close"></i>',
//         confirmCreate: true,
//       },
//       edit: {
//         editButtonContent: '<i class="nb-edit"></i>',
//         saveButtonContent: '<i class="nb-checkmark"></i>',
//         cancelButtonContent: '<i class="nb-close"></i>',
//         confirmSave: true,
//       },
//       delete: {
//         deleteButtonContent: '<i class="nb-trash"></i>',
//         confirmDelete: true,
//       },
//       columns: {
//         id: {
//           title: 'ID',
//           editable: false,
//           addable: false
//         },
//         nom: {
//           title: 'Nom',
//           editor: {
//             type: 'input',
//           }
//         },
//         poste: {
//           title: 'Poste',
//           editor: {
//             type: 'input',
//           }
//         },
//         email: {
//           title: 'Email',
//           filter: false,
//           editable: false,
//           editor: {
//             type: 'input',
//           }
//         },
//         machineId: {
//           title: 'Machine',
//           editor: {
//             type: 'list',
//             config: {
//               selectText: 'Sélectionner...',
//               list: this.machineOptions
//             }
//           },
//           filter: false,
//           valuePrepareFunction: (machineId: any) => {
//             const found = this.machineOptions.find(opt => opt.value === machineId);
//             return found ? found.title : machineId;
//           }
//         }
//       }
//     };
//   }

//   loadEmployes(): void {
//     this.employeService.getAllEmployes().subscribe({
//       next: (data) => this.source.load(data),
//       error: () => alert('Erreur lors du chargement des employés')
//     });
//   }

//   onCreateConfirm(event: any): void {
//     const newEmploye = event.newData;

//     // Validation simple
//     if (!newEmploye.nom || !newEmploye.poste || !newEmploye.email || !newEmploye.machineId) {
//       alert('⚠️ Tous les champs sont obligatoires');
//       event.confirm.reject();
//       return;
//     }

//     // Ajouter mot de passe par défaut
//     const employeToCreate = {
//       ...newEmploye,
//       password: 'default123'
//     };

//     this.employeService.createEmploye(employeToCreate).subscribe({
//       next: (created) => {
//         event.confirm.resolve(created);
//         alert('✅ Employé créé');
//       },
//       error: () => {
//         alert('❌ Erreur lors de la création');
//         event.confirm.reject();
//       }
//     });
//   }

//   onEditConfirm(event: any): void {
//     const updated = event.newData;
//     this.employeService.updateEmploye(updated.id, updated).subscribe({
//       next: () => {
//         event.confirm.resolve(updated);
//         alert('✅ Employé mis à jour');
//       },
//       error: () => {
//         event.confirm.reject();
//         alert('❌ Erreur de mise à jour');
//       }
//     });
//   }

//   onDeleteConfirm(event: any): void {
//     if (window.confirm('Supprimer cet employé ?')) {
//       this.employeService.deleteEmploye(event.data.id).subscribe({
//         next: () => {
//           event.confirm.resolve();
//           alert('✅ Employé supprimé');
//         },
//         error: () => {
//           event.confirm.reject();
//           alert('❌ Erreur de suppression');
//         }
//       });
//     } else {
//       event.confirm.reject();
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../../services/EmployeService';
import { MachineService } from '../../services/MachineService';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  machineOptions: { value: number; title: string }[] = [];
  settings: any = {};

  constructor(
    private employeService: EmployeService,
    private machineService: MachineService
  ) {}

  ngOnInit(): void {
    this.loadMachines();
  }

  loadMachines(): void {
    this.machineService.getAvailableMachines().subscribe({
      next: (machines) => {
        this.machineOptions = machines.map((m: any) => ({
          value: m.id,
          title: m.nom
        }));
        this.initSettings();
        this.loadEmployes();
      },
      error: () => alert('Erreur lors du chargement des machines')
    });
  }

  initSettings(): void {
    this.settings = {
      actions: {
        add: true,
        edit: true,
        delete: true,
        position: 'left',
        columnTitle: 'Actions',
        addButtonContent: '<i class="nb-plus"></i>',
        editButtonContent: '<i class="nb-edit"></i>',
        deleteButtonContent: '<i class="nb-trash"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
        confirmSave: true,
        confirmDelete: true,
      },
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
          editable: false,
          addable: false
        },
        nom: {
          title: 'Nom',
          editor: { type: 'input' }
        },
        poste: {
          title: 'Poste',
          editor: { type: 'input' }
        },
        email: {
          title: 'Email',
          filter: false,
          editable: false, // Empêche la modification de l'email
          editor: { type: 'input' }
        },
        machineId: {
          title: 'Machine',
          editor: {
            type: 'list',
            config: {
              selectText: 'Sélectionner...',
              list: this.machineOptions
            }
          },
          filter: false,
          valuePrepareFunction: (machineId: any, row: any) => {
            // Affiche le nom de la machine assignée via machineAssignee
            if (row.machineAssignee && row.machineAssignee.nom) {
              return row.machineAssignee.nom;
            }
            return 'Non assignée';
          }
        }
      }
    };
  }

  loadEmployes(): void {
    this.employeService.getAllEmployes().subscribe({
      next: (data) => {
        // Mappe les employés pour préparer les données pour ng2-smart-table
        const mapped = data.map((emp: any) => ({
          ...emp,
          machineAssignee: emp.machineAssignee || null,
          machineId: emp.machineAssignee ? emp.machineAssignee.id : null,
        }));
        this.source.load(mapped);
      },
      error: () => alert('Erreur lors du chargement des employés')
    });
  }

  onCreateConfirm(event: any): void {
    const newEmploye = event.newData;

    if (!newEmploye.nom || !newEmploye.poste || !newEmploye.email || !newEmploye.machineId) {
      alert('⚠️ Tous les champs sont obligatoires');
      event.confirm.reject();
      return;
    }

    const employeToCreate = {
      ...newEmploye,
      password: 'default123'
    };

    this.employeService.createEmploye(employeToCreate).subscribe({
      next: (created) => {
        event.confirm.resolve(created);
        alert('✅ Employé créé');
        this.loadEmployes(); // recharge la liste
      },
      error: () => {
        alert('❌ Erreur lors de la création');
        event.confirm.reject();
      }
    });
  }

onEditConfirm(event: any): void {
  const updated = { ...event.newData };

  // Préparer le champ machineAssignee selon la sélection (objet ou null)
  if (updated.machineId) {
    updated.machineAssignee = { id: updated.machineId };  // objet {id: number}
  } else {
    updated.machineAssignee = null;  // null si aucune machine assignée
  }

  // Supprimer les champs inutiles avant envoi
  delete updated.machineId;
  delete updated.machineAssignee_nom; // au cas où il existe dans l'objet
  // Si tu as d'autres propriétés machineAssignee complètes, les supprimer aussi
  // delete updated.machineAssignee; -> **NON** car on doit envoyer ce champ !

  this.employeService.updateEmploye(updated.id, updated).subscribe({
    next: () => {
      event.confirm.resolve(updated);
      alert('✅ Employé mis à jour');
      this.loadEmployes(); // recharge la liste
    },
    error: () => {
      event.confirm.reject();
      alert('❌ Erreur lors de la mise à jour');
    },
  });
}




  onDeleteConfirm(event: any): void {
    if (window.confirm('Supprimer cet employé ?')) {
      this.employeService.deleteEmploye(event.data.id).subscribe({
        next: () => {
          event.confirm.resolve();
          alert('✅ Employé supprimé');
          this.loadEmployes(); // recharge la liste
        },
        error: () => {
          event.confirm.reject();
          alert('❌ Erreur de suppression');
        }
      });
    } else {
      event.confirm.reject();
    }
  }
}
