import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
    }
]
@NgModule({
    declarations: [AuthComponent],
    imports: [RouterModule.forChild(routes), SharedModule],
    exports:[AuthComponent, RouterModule]
})
export class AuthModule { }