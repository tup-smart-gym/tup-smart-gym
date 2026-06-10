import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent implements OnInit {
  public isLoading: boolean = false;

  constructor(private router: Router,public auth:AuthService) { }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if(isAuthenticated){
        this.router.navigate(['/main']);
      }
    })
  }

  public onLogin(): void {
    this.isLoading = true;
    this.auth.loginWithRedirect();
  }

  // Cuando la imagen no carga, muestra el ícono de pesas como fallback
  public onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';

    const wrapper = img.parentElement;
    if (wrapper) {
      const icon = document.createElement('span');
      icon.className = 'material-icons logo-fallback-icon';
      icon.textContent = 'fitness_center';
      wrapper.appendChild(icon);
    }
  }
}
