import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingRouting } from './shopping-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShoppingListComponent,
    ShoppingEditComponent,],
  imports: [RouterModule, ShoppingRouting, SharedModule]
})
export class ShoppingModule { }
