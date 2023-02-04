import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGaurd } from '../auth/auth.gaurd';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { DefaultLoaderComponent } from './default-loader/default-loader.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { DataResolver } from '../shared/data-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGaurd],
    children: [
      { path: 'new', component: RecipeEditComponent },
      { path: '', component: DefaultLoaderComponent },
      {
        path: ':id',
        component: RecipeDetailsComponent,
        resolve: [DataResolver],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [DataResolver],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRouting { }
