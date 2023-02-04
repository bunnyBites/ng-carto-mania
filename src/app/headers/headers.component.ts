import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataManipulateservice } from '../shared/data-manipulate.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css'],
})
export class HeadersComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  isLogin = false;
  constructor(
    private dataService: DataManipulateservice,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.userAuthenticator.subscribe(
      (user) => {
        this.isLogin = !!user;
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }

  onSaveData() {
    this.dataService.onSaveData();
  }

  onFetchData() {
    this.dataService.fetchData().subscribe();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
