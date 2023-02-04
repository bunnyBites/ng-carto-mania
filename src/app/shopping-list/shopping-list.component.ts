import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  ingredientSubscription: Subscription;
  constructor(private shoppingService: ShoppingService) {}

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.ingredientSubscription = this.shoppingService.ingredientEmitter.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onSetIngredient(index: number) {
    this.shoppingService.ingredientSetter.next(index);
  }
}
