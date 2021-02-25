import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginCredentials } from '../interfaces/auth/logincredential.interface';
import { RegisterCredentials } from '../interfaces/auth/registercredential.interface';
import { AuthNetworkingService } from './authnetworking.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

    public readonly AuthEffects: Subject<AuthEffect> = new Subject<AuthEffect>();
    
    
    public get logedIn() : boolean {
      this.loadFromLocalStoreage();
      return this.authStore.logedin;
    }
    

  private authStore: AuthStore ={
    logedin: false,
    access_token: undefined,
  };

  constructor(private authNetworking: AuthNetworkingService) { }
  
  ngOnInit(): void {
    this.loadFromLocalStoreage();
  }

  public login(credentials: LoginCredentials): void {
    this.authNetworking.login(credentials).subscribe(res => {
      this.authStore = { logedin: true, access_token: res.body?.access_token,};
      this.safeToLocalStoreage();
      this.AuthEffects.next({ authevent: AuthEvent.LoginSuccess });
    }, error => {
      this.AuthEffects.next({ authevent: AuthEvent.LoginFail, payload: error.error});
    });
  }

  public register(credentials: RegisterCredentials): void {
    this.authNetworking.register(credentials).subscribe(res => {
      this.login({...credentials});
    });
  }

  public logout(): void {
    this.authStore = { logedin: false };
    this.safeToLocalStoreage();
  }

  private safeToLocalStoreage(): void {
    localStorage.setItem('access_token', this.authStore.access_token ?? '');
  }

  private loadFromLocalStoreage(): void {
    this.authStore = { logedin: false };
    this.authStore.access_token = localStorage.getItem('access_token') ?? undefined;
    if(this.authStore.access_token !== null && this.authStore.access_token !== undefined && this.authStore.access_token !== '') {
      this.authStore.logedin = true;
      console.log(this.authStore)
    }
  }

}

export interface AuthEffect {
  authevent: AuthEvent;
  payload?: any;
}

export enum AuthEvent {
  LoginSuccess,
  LoginFail,
  RegisterSuccess,
  RegisterFail,
  RegisterAndLoginSuccess,
}

interface AuthStore {
  logedin: boolean;
  access_token?: string;
}
