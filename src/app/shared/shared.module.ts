import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:
        [
            DropdownDirective,
            AlertComponent,
            LoadingSpinnerComponent,
        ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    exports: [
        DropdownDirective,
        AlertComponent,
        LoadingSpinnerComponent,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ]
})
export class SharedModule { }