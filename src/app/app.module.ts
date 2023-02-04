import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeadersComponent } from './headers/headers.component';
import { AppRouting } from './app-routing.module';
import { DirectiveHolderDirective } from './shared/directive-holder.directive';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    DirectiveHolderDirective,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    CoreModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
