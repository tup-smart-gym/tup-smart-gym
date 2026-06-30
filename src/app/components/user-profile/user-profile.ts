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

  errorMessage: string = '';

  // Límites de validación
  readonly DNI_MIN = 6;
  readonly DNI_MAX = 8;
  readonly TEL_MIN = 10;
  readonly TEL_MAX = 15;
  readonly DIR_MIN = 2;
  readonly DIR_MAX = 128;

  // Fecha máxima permitida (hoy), para el atributo [max] del input date
  fechaMaxima: string = new Date().toISOString().split('T')[0];

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
      }
    });
  }

  startEditing(): void {
    this.tempDni = this.dni;
    this.tempFecha = this.fechaNacimiento;
    this.tempDireccion = this.direccion;
    this.tempTelefonos = [...this.telefonos];
    this.errorMessage = '';
    this.isEditing = true;
  }

  cancelEditing(): void {
    this.dni = this.tempDni;
    this.fechaNacimiento = this.tempFecha;
    this.direccion = this.tempDireccion;
    this.telefonos = [...this.tempTelefonos];
    this.errorMessage = '';
    this.isEditing = false;
  }

  // Filtra cualquier carácter no numérico mientras el usuario escribe el DNI
  onDniInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');
    if (valor.length > this.DNI_MAX) {
      valor = valor.slice(0, this.DNI_MAX);
    }
    this.dni = valor;
    input.value = valor;
  }

  // Filtra cualquier carácter no numérico mientras el usuario escribe un teléfono
  onTelefonoInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');
    if (valor.length > this.TEL_MAX) {
      valor = valor.slice(0, this.TEL_MAX);
    }
    this.telefonos[index] = valor;
    input.value = valor;
  }

  private validarFormulario(): boolean {
    // Campos vacíos
    if (!this.dni.trim() || !this.fechaNacimiento.trim() || !this.direccion.trim()) {
      this.errorMessage = 'No se pueden guardar campos vacíos.';
      return false;
    }
    if (this.telefonos.some(tel => !tel.trim())) {
      this.errorMessage = 'No se pueden guardar teléfonos vacíos.';
      return false;
    }

    // DNI
    if (this.dni.length < this.DNI_MIN || this.dni.length > this.DNI_MAX) {
      this.errorMessage = `El DNI debe tener entre ${this.DNI_MIN} y ${this.DNI_MAX} dígitos.`;
      return false;
    }

    // Teléfonos
    for (const tel of this.telefonos) {
      if (tel.length < this.TEL_MIN || tel.length > this.TEL_MAX) {
        this.errorMessage = `Cada teléfono debe tener entre ${this.TEL_MIN} y ${this.TEL_MAX} dígitos.`;
        return false;
      }
    }

    // Dirección
    if (this.direccion.length < this.DIR_MIN || this.direccion.length > this.DIR_MAX) {
      this.errorMessage = `La dirección debe tener entre ${this.DIR_MIN} y ${this.DIR_MAX} caracteres.`;
      return false;
    }

    // Fecha de nacimiento no puede ser futura
    if (this.fechaNacimiento > this.fechaMaxima) {
      this.errorMessage = 'La fecha de nacimiento no puede ser posterior a hoy.';
      return false;
    }

    this.errorMessage = '';
    return true;
  }

  saveChanges(): void {
    if (!this.validarFormulario()) {
      return;
    }
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