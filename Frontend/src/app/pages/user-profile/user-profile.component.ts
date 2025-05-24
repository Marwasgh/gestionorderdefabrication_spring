import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'ngx-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = null;
  editedUser: any = {};
  isEditing: boolean = false;
  userId: string | null = null; // 👈 On stocke l'ID ici

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const token = sessionStorage.getItem('auth_token');
    if (!token) {
      console.error("Token manquant");
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>('http://localhost:8022/users/profile', { headers }).subscribe({
      next: (response) => {
        this.user = response;
        this.editedUser = { ...response };
        this.userId = response.id || response._id || null; // 👈 Récupération directe de l’ID
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil', err);
      }
    });
  }

  editProfile(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedUser = { ...this.user };
  }

  saveChanges(): void {
    const token = sessionStorage.getItem('auth_token');
    if (!token) {
      console.error("Token manquant");
      return;
    }

    if (!this.userId) {
      console.error("ID utilisateur non trouvé");
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.put<any>(`http://localhost:8022/users/${this.userId}`, this.editedUser, { headers }).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.editedUser = { ...updatedUser };
        this.isEditing = false;
        console.log("Profil mis à jour avec succès.");
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour du profil", err);
      }
    });
  }
}
