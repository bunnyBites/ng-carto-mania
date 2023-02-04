import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { DataManipulateservice } from './data-manipulate.service';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataResolver implements Resolve<Recipe[]> {
  constructor(
    private dataService: DataManipulateservice,
    private recipeService: RecipeService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataService.fetchData();
    } else {
        return recipes;
    }
  }
}
