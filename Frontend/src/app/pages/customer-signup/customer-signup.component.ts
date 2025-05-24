import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthModel } from '../../models/auth.model';

@Component({
  selector: 'ngx-signup',
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.scss'],
})
export class CustomSignupComponent {
  user: AuthModel = { nom: '', email: '', password: '', role: 'user' };
  loading = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
  if (!this.user.nom || !this.user.email || !this.user.password) {
    this.errorMessage = 'Veuillez remplir tous les champs.';
    return;
  }

  if (!this.isValidEmail(this.user.email)) {
    this.errorMessage = 'Veuillez entrer un email valide.';
    return;
  }
  if (!this.isValidPassword(this.user.password)) {
    this.errorMessage =
      'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un caractère spécial.';
    return;
  }

  this.loading = true;
  this.errorMessage = '';

  this.authService.signup(this.user).subscribe({
    next: (response: any) => {
      this.loading = false;
      if (response && response.id) {
        alert('Inscription réussie ! 🎉');
        this.router.navigateByUrl('/auth/login');
      } else {
        this.errorMessage = "Erreur inconnue lors de l'inscription.";
        console.error('Réponse inattendue du backend:', response);
      }
    },
    error: (error) => {
      this.loading = false;
      if (error.status === 400 && typeof error.error === 'string') {
        this.errorMessage = error.error;
      } else {
        this.errorMessage = "Une erreur s'est produite. Veuillez réessayer.";
      }
      console.error('Erreur HTTP:', error);
    },
  });
}
isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
isValidPassword(password: string): boolean {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return password.length >= minLength && hasUppercase && hasSpecialChar;
}

}
