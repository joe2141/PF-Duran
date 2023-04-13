import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloDirective } from './titulo.directive';


@NgModule({
    declarations: [
        TituloDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TituloDirective
    ]
})
export class DirectivesModule { }