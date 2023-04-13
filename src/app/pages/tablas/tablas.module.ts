import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TablasComponent } from './tablas.component';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';





@NgModule({
  declarations: [
    TablasComponent,
    AbmAlumnosComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    DirectivesModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule

  ],
  exports: [
    TablasComponent


  ]
})
export class TablasModule { }
