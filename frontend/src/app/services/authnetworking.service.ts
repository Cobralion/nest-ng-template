import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JWTResponse } from 'src/app/interfaces/auth/jwtresponse.interface';
import { LoginCredentials } from 'src/app/interfaces/auth/logincredential.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthNetworkingService {

  public readonly AUTH_API_PATH: string = 'http://localhost:3000/auth/';

  constructor(private httpClient: HttpClient) { }

  login(credentials: LoginCredentials): Observable<JWTResponse> {
    return this.httpClient.post<JWTResponse>(`${this.AUTH_API_PATH}login`, credentials);
  }

}
