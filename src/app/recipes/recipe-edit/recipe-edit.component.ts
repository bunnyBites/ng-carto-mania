import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Routes } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  isAlreadPresent = false;
  recipeGroup: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.isAlreadPresent = params.id != null;
        this.ngInit();
      }
    );
  }

  private ngInit() {

    let name = '';
    let imagePath = '';
    let description = '';
    const recipeIngredients = new FormArray([]);

    if (this.isAlreadPresent) {

      const recipe = this.recipeService.getRecipeById(this.id);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;

      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push (
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [ Validators.required, Validators.pattern(/^[0-9]+[1-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeGroup = new FormGroup({

      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: recipeIngredients
    });
  }

  onAddIngredient() {

    ( this.recipeGroup.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [ Validators.required, Validators.pattern(/^[0-9]+[1-9]*$/)])
      })
    );
  }

  onSave() {
    this.recipeService.saveRecipe(this.recipeGroup.value, this.id, this.isAlreadPresent);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    ( this.recipeGroup.get('ingredients') as FormArray).removeAt(index);
  }

}
