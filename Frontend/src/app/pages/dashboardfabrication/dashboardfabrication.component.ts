import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface OrdreFabrication {
  id: number;
  etat: string;
}

interface Machine {
  id: number;
  etat: string; // Exemple : "Disponible", "En maintenance"
}


@Component({
  selector: 'ngx-dashboardfabrication',
  templateUrl: './dashboardfabrication.component.html',
  styleUrls: ['./dashboardfabrication.component.scss']
})
export class DashboardfabricationComponent implements OnInit {
  stats = {
    total: 0,
    termine: 0,
    enCours: 0,
    enAttente: 0,
    nonTermine: 0,
    machinesDisponibles: 0,
    machinesEnMaintenance: 0
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.chargerOrdres();
    this.chargerMachines();
  }

  chargerOrdres(): void {
    this.http.get<OrdreFabrication[]>('http://localhost:8022/api/ordres').subscribe({
      next: ordres => {
        this.stats.total = ordres.length;
        this.stats.termine = ordres.filter(o => o.etat === 'TERMINE').length;
        this.stats.enCours = ordres.filter(o => o.etat === 'EN_COURS').length;
        this.stats.enAttente = ordres.filter(o => o.etat === 'EN_ATTENTE').length;
        this.stats.nonTermine = this.stats.total - this.stats.termine;
      },
      error: err => {
        alert("Erreur lors du chargement des ordres !");
        console.error(err);
      }
    });
  }

  chargerMachines(): void {
    this.http.get<Machine[]>('http://localhost:8022/api/machines').subscribe({
      next: machines => {
        this.stats.machinesDisponibles = machines.filter(m => m.etat === 'Disponible').length;
        this.stats.machinesEnMaintenance = machines.filter(m => m.etat === 'En maintenance').length;
      },
      error: err => {
        alert("Erreur lors du chargement des machines !");
        console.error(err);
      }
    });
  }
}
