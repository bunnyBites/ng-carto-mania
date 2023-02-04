import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '', redirectTo: '/recipe', pathMatch: 'full'
  },
  {
    path: 'recipe',
    loadChildren: () => import('./recipes/recipe.module').then(m => m.RecipeModule)
  },
  {
    path: 'shopping',
    loadChildren: () => import('./shopping-list/shopping.module').then(m => m.ShoppingModule)
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],

  exports: [RouterModule],
})
export class AppRouting { }
