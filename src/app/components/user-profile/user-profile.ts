import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfileComponent implements OnInit {

  nombre: string = '';
  email: string = '';
  imagen: string = '';

  dni: string = '';
  fechaNacimiento: string = '';
  direccion: string = '';
  telefonos: string[] = [''];

  isEditing: boolean = false;

  private tempDni: string = '';
  private tempFecha: string = '';
  private tempDireccion: string = '';
  private tempTelefonos: string[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.nombre = user.name || '';
        this.email = user.email || '';
        this.imagen = user.picture || '';
        console.log('picture:', user.picture);
      }
    });
  }

  startEditing(): void {
    this.tempDni = this.dni;
    this.tempFecha = this.fechaNacimiento;
    this.tempDireccion = this.direccion;
    this.tempTelefonos = [...this.telefonos];
    this.isEditing = true;
  }

  cancelEditing(): void {
    this.dni = this.tempDni;
    this.fechaNacimiento = this.tempFecha;
    this.direccion = this.tempDireccion;
    this.telefonos = [...this.tempTelefonos];
    this.isEditing = false;
  }

  saveChanges(): void {
    console.log('Guardando:', { dni: this.dni, fechaNacimiento: this.fechaNacimiento, direccion: this.direccion, telefonos: this.telefonos });
    this.isEditing = false;
  }

  addTelefono(): void {
    this.telefonos.push('');
  }

  removeTelefono(index: number): void {
    this.telefonos.splice(index, 1);
  }

  trackByIndex(index: number): number {
    return index;
  }
}