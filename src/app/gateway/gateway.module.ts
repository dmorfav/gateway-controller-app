import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GatewayComponent} from './gateway.component';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { FormComponent } from './form/form.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';



@NgModule({
  declarations: [GatewayComponent, FormComponent],
  imports: [
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatAutocompleteModule
  ]
})
export class GatewayModule { }
