import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeService {
  constructor(private shoppingService: ShoppingService) { }

  recipeSubject = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipe: Recipe[]) {
    this.recipes = recipe;
    this.recipeSubject.next(this.recipes.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  saveRecipe(recipe: Recipe, index: number, isEditMode: boolean) {
    if (isEditMode) {
      this.recipes[index] = recipe;
    } else {
      this.recipes.push(recipe);
    }
    this.recipeSubject.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeSubject.next(this.recipes.slice());
  }
}
