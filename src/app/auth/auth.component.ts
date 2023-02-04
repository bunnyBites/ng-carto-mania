import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ViewChildren,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthReturnType } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DirectiveHolderDirective } from '../shared/directive-holder.directive';
import { AlertComponent } from '../shared/alert/alert.component';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('formData') formData: NgForm;
  @ViewChild(DirectiveHolderDirective, { static: false })
  appDirective: DirectiveHolderDirective;
  private closeSub: Subscription;
  isLoginMode = false;
  isLoading = false;
  error: string = null;
  pageObservable: Observable<AuthReturnType>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componetFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}

  eventSwitcher() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    const formValue = this.formData.value;
    this.isLoading = true;
    if (this.isLoginMode) {
      this.pageObservable = this.authService.onLogin(
        formValue.email,
        formValue.password
      );
    } else {
      this.pageObservable = this.authService.onSignup(
        formValue.email,
        formValue.password
      );
    }
    this.formData.reset();
    this.pageObservable.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/recipe']);
      },
      (errorRes) => {
        console.log(errorRes);
        this.error = errorRes;
        this.isLoading = false;
        this.showAlertMessage(errorRes);
      }
    );
  }

  showAlertMessage(message: string) {
    const componentFactory = this.componetFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    const viewChild = this.appDirective.viewContainerRef;
    viewChild.clear();
    const alertComponent = viewChild.createComponent(componentFactory);
    alertComponent.instance.message = message;
    this.closeSub = alertComponent.instance.closeAlert.subscribe(() => {
      this.closeSub.unsubscribe();
      viewChild.clear();
    });
  }

  killAlert() {
    this.error = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
