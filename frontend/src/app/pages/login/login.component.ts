import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription = new Subscription();
  public loginGroup: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.AuthEvents.subscribe(e => {
        this.router.navigate(['/home']);
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onSubmit(): void {
    console.log(this.loginGroup.value);
    this.authService.login(
      {
        username: this.loginGroup.value.username!,
        password: this.loginGroup.value.password!
      }
    );
  }

}
