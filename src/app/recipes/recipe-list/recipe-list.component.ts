import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { DataManipulateservice } from '../../shared/data-manipulate.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeSubscription: Subscription;
  isLoading = true;
  constructor(private recipeService: RecipeService, private dataService: DataManipulateservice) {}

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }

  ngOnInit() {

    this.dataService.fetchData().subscribe(
      () => {
        this.isLoading = false;
      }
    );
    this.recipes = this.recipeService.getRecipes();
    this.recipeSubscription = this.recipeService.recipeSubject.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }
}
