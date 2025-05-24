import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthModel } from '../../models/auth.model';

@Component({
  selector: 'ngx-custom-login',
  templateUrl: './custom-login.component.html',
  styleUrls: ['./custom-login.component.scss'],
})
export class CustomLoginComponent {
  user: AuthModel = { email: '', password: '' };
  loading = false;
  errorMessage: string = ''; // pour afficher le message d’erreur

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.loading = true;
    this.errorMessage = ''; // reset message erreur

    this.authService.signin(this.user).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response && response.token) {
          sessionStorage.setItem('auth_token', response.token);
          alert('Connexion réussie ! 🎉');  // alert succès uniquement
          this.router.navigateByUrl('/pages/dashboard');
        } else {
          // Message erreur dans la page
          this.errorMessage = 'Connexion échouée : réponse inattendue du serveur.';
          console.error('Réponse inattendue du backend:', response);
        }
      },
      error: (error) => {
        this.loading = false;
        // Affiche message erreur spécifique ou générique
        if (error.status === 401 || error.status === 400) {
          this.errorMessage = 'Email ou mot de passe incorrect.';
        } else {
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        }
        console.error('Erreur HTTP:', error);
      },
    });
  }
}
