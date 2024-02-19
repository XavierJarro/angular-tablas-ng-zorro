import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';
import { Empleado } from './empleado';

@Component({
  selector: 'nz-demo-form-validate-reactive',
  template: `

<form nz-form [formGroup]="validateForm" (ngSubmit)="agregar()">
      <nz-form-item>
        <nz-form-label [nzSpan]="7" nzRequired>Nombre</nz-form-label>
        <nz-form-control [nzSpan]="12" >
          <input nz-input formControlName="nombre" placeholder="Nombre" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="7" nzRequired>Apellido</nz-form-label>
        <nz-form-control [nzSpan]="12" >
          <input nz-input formControlName="apellido" placeholder="Apellido" />
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzSm]="8" [nzXs]="24" >Fecha</nz-form-label>
        <nz-form-control [nzSm]="16" [nzXs]="24">
          <nz-date-picker formControlName="fecha"></nz-date-picker>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-control [nzOffset]="7" [nzSpan]="12">
          <button nz-button >Agregar</button>
        </nz-form-control>
      </nz-form-item>
    </form>


  <nz-table #editRowTable nzBordered [nzData]="empleadoArray">
      <thead>
        <tr>
          <th nzWidth="30%">NOMBRE</th>
          <th>APELLIDO</th>
          <th>FECHA</th>
          <th>ACCION</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of editRowTable.data" class="editable-row">
          <td>
            <div class="editable-cell" [hidden]="editId === data.id" (click)="editar(data.id)">
              {{ data.nombre }}
            </div>
            <input [hidden]="editId !== data.id" type="text" nz-input [(ngModel)]="data.nombre" (blur)="pararEditar()" />
          </td>
          <td>{{ data.apellido }}</td>
          <td>{{ data.fecha }}</td>
          <td>
            <a nz-popconfirm nzPopconfirmTitle="Estas seguro de eliminar?" (nzOnConfirm)="borrar(data.id)">Borrar</a>
          </td>
        </tr>
      </tbody>
    </nz-table>

  `,

  styles: [
    `
      [nz-form] {
        max-width: 600px;
      }

      button {
        margin-left: 8px;
      }
    `
  ]
})
export class NzDemoFormValidateReactiveComponent {
  validateForm: FormGroup<{
    nombre: FormControl<string>;
    apellido: FormControl<string>;
    fecha: FormControl<string>;
  }>;

  empleadoArray: Empleado[]=[
    {id:1, nombre:"Hola3", apellido:"Mundo",fecha:new Date("2018-03-16")},
    {id:2, nombre:"da", apellido:"frfr",fecha:new Date("2018-03-16")},
    {id:3, nombre:"dafe", apellido:"frfr",fecha:new Date("2018-03-16")},
  ];
  empleadoSeleccionado: Empleado= new Empleado();
  i = 0;
  editId: string | null = null;


  agregar(): void {
    //console.log('submit', this.validateForm.value.fecha);
    this.empleadoSeleccionado.id=this.empleadoArray.length+1;
    this.empleadoSeleccionado.nombre=String(this.validateForm.value.nombre);
    this.empleadoSeleccionado.apellido=String(this.validateForm.value.apellido);
    this.empleadoSeleccionado.fecha=new Date(String(this.validateForm.value.fecha));
    //console.log(this.empleadoSeleccionado);
    this.empleadoArray.push(this.empleadoSeleccionado);
    this.empleadoSeleccionado= new Empleado();
    console.log(this.empleadoArray);
    this.validateForm.reset();
    this.empleadoArray = [...this.empleadoArray];
  }

  borrar(id: number): void {
    this.empleadoArray = this.empleadoArray.filter(d => d.id !== id);
  }
  editar(id: string): void {
    this.editId = id;
  }

  pararEditar(): void {
    this.editId = null;
  }
  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      fecha:['', [Validators.required]]
    });
  }

}
