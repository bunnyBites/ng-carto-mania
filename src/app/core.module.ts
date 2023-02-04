import { NgModule } from '@angular/core';
import { ShoppingService } from './shopping-list/shopping.service';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
    providers:[
        ShoppingService, RecipeService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ]
})
export class CoreModule {}