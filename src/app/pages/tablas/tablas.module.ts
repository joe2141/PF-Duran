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



@NgModule({
  declarations: [
    TablasComponent
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
    MatButtonModule
  ],
  exports: [
    TablasComponent


  ]
})
export class TablasModule { }
