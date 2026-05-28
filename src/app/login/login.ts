import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.isSessionActive()) {
      this.router.navigate(['/main']);
    }
  }

  public onLogin(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      sessionStorage.setItem('session_active', 'true');
      this.router.navigate(['/main']);
    }, 2000);
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

  private isSessionActive(): boolean {
    return sessionStorage.getItem('session_active') === 'true';
  }
}
