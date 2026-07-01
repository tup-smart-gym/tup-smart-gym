import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css'
})
export class EditUserComponent implements OnInit {
  perfilForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [{ value: 'Angelo Raso', disabled: true }],
      correo: [{ value: 'angelorasoutnfrp@gmail.com', disabled: true }],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefonos: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    });
  }

  get telefonos(): FormArray {
    return this.perfilForm.get('telefonos') as FormArray;
  }

  agregarTelefono() {
    this.telefonos.push(this.fb.control('', Validators.required));
  }

  eliminarTelefono(index: number) {
    if (this.telefonos.length > 1) {
      this.telefonos.removeAt(index);
    }
  }

  guardarCambios() {
    if (this.perfilForm.valid) {
      console.log(this.perfilForm.getRawValue()); 
    }
  }
}