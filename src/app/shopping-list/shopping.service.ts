import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingService {
  ingredientEmitter = new Subject<Ingredient[]>();

  ingredientSetter = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Batter', 5),
    new Ingredient('cereals', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredientById(index: number) {
    return this.ingredients.slice()[index];
  }

  addIngredient(
    ingredient: { name: string; amount: number },
    index: number,
    isEditMode: boolean
  ) {
    if (isEditMode) {
      this.ingredients[index] = new Ingredient(
        ingredient.name,
        ingredient.amount
      );
    } else {
      this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
    }
    this.ingredientEmitter.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientEmitter.next(this.ingredients.slice());
  }

  addIngredients(ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient);
  }
}
