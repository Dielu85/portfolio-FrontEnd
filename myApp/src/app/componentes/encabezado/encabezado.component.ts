import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

interface User {
  id: number;
  nombre: string;
  backimg: string;
  foto: string;
  titulo: string;
  resumen: string;
  ubicacion: string;
  email: string;
  telefono: string;
}

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css'],
})
export class EncabezadoComponent implements OnInit {
  users: User[] = [];
  editForm: FormGroup;
  editingUser: User | null = null;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      nombre: '',
      titulo: '',
      resumen: '',
      ubicacion: '',
      email: '',
      telefono: '',
    });
  }

  ngOnInit() {
    this.http.get<User[]>('https://portfoliodg-be.onrender.com/ver/personas').subscribe(data => {
      this.users = data;
    });
  }

  editUser(user: User) {
    this.editingUser = user;
    this.editForm.patchValue({
      nombre: user.nombre,
      titulo: user.titulo,
      resumen: user.resumen,
      ubicacion: user.ubicacion,
      email: user.email,
      telefono: user.telefono,
    });
  }

  cancelEdit() {
    this.editingUser = null;
    this.editForm.reset();
  }

  saveChanges() {
    if (!this.editingUser) {
      return;
    }

    const formData = { ...this.editingUser, ...this.editForm.value };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put<User>('https://portfoliodg-be.onrender.com/new/persona/' + this.editingUser.id, formData, { headers })
      .subscribe(updatedUser => {
        this.editingUser = null;
        this.users = this.users.map(user => (user.id === updatedUser.id ? updatedUser : user));
        this.editForm.reset();
      });
  }
}
