import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit{

  form!: FormGroup

  constructor(private authService: AuthService) {}


  ngOnInit(): void {
    
    this.form = new FormGroup({
      "login": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(20)]
      }),
      "password": new FormControl(null, {
        validators: [Validators.required]
      })
    })
  }

  onLogin() {
    if (this.form.invalid) {
      return
    }

    this.authService.login(this.form.value.login, this.form.value.password)
  }



}
