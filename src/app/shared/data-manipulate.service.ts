import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/Operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataManipulateservice {
  constructor(
    private http: HttpClient,
    private recipeSevice: RecipeService,
    private authService: AuthService
  ) {}

  fetchData() {
    return this.http
      .get<Recipe[]>('https://ng-demo-app-6c0dc.firebaseio.com/recipes.json')
      .pipe(
        map((recipeArray) => {
          return recipeArray.map((recipes: Recipe) => {
            return {
              ...recipes,
              ingredients: recipes.ingredients ? recipes.ingredients : [],
            };
          });
        }),
        tap((response) => {
          this.recipeSevice.setRecipes(response);
        })
      );
  }

  onSaveData() {
    const recipes = this.recipeSevice.getRecipes();
    this.http
      .put('https://ng-demo-app-6c0dc.firebaseio.com/recipes.json', recipes)

      .subscribe((response) => {
        console.log(response);
      });
  }
}
