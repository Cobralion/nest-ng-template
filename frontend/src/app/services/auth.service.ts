import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginCredentials } from '../interfaces/auth/logincredential.interface';
import { AuthNetworkingService } from './authnetworking.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  	public readonly AuthEvents: Subject<AuthEvent> = new Subject<AuthEvent>();

  private authStore: AuthStore ={
    logedin: false,
    jwt: undefined,
    expires: undefined
  };

  constructor(private authNetworking: AuthNetworkingService) { }
  
  ngOnInit(): void {
    this.loadFromLocalStoreage();
  }

  public login(credentials: LoginCredentials): void {
    this.authNetworking.login(credentials).subscribe(res => {
      this.authStore = {logedin: true, jwt: res.jwt, expires: new Date(res.expires)};
      this.safeToLocalStoreage();
      this.AuthEvents.next(AuthEvent.LoginSuccess);
    });
  }

  public logout(): void {
    this.authStore = { logedin: false };
    this.safeToLocalStoreage();
  }

  private safeToLocalStoreage(): void {
    localStorage.setItem('jwt', this.authStore.jwt ?? '');
    localStorage.setItem('expires', this.authStore.expires?.toISOString() || '');
  }

  private loadFromLocalStoreage(): void {
    this.authStore = { logedin: false };
    this.authStore.jwt = localStorage.getItem('jwt') ?? undefined;
    this.authStore.expires = new Date(localStorage.getItem('expires') || '') ?? undefined;
    if(this.authStore.jwt !== null && this.authStore.jwt !== undefined && this.authStore.jwt !== '' && this.authStore.expires !== null && this.authStore.expires !== undefined) {
      this.authStore.logedin = true;
    }
  }

}

export enum AuthEvent {
  LoginSuccess,
  LoginFail
}

interface AuthStore {
  logedin: boolean;
  jwt?: string;
  expires?: Date;
}
