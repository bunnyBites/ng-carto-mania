import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') formHolder: NgForm;
  ingredient: Ingredient;
  editMode = false;
  ingredientIndex: number;
  subscription: Subscription;

  onAddIngredient() {

    const name: string = this.formHolder.value.name;
    const amount: number = this.formHolder.value.amount;
    this.shoppingService.addIngredient({name, amount}, this.ingredientIndex, this.editMode);
    this.editMode = false;
    this.formHolder.reset();
  }
  constructor(private shoppingService: ShoppingService) { }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.subscription = this.shoppingService.ingredientSetter.subscribe(

      (index: number) => {
        this.editMode = true;
        this.ingredient = this.shoppingService.getIngredientById(index);
        this.ingredientIndex = index;
        this.formHolder.form.patchValue({
          name:this.ingredient.name,
          amount: this.ingredient.amount
        })
      })
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.ingredientIndex);
    this.formHolder.onReset();
  }

}
