import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.sass'
})
export class SettingsComponent implements OnInit {

  formPass!: FormGroup;
  formAdd!: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.formPass = new FormGroup({
      "aktualne": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(40)]
      }),
      "nowe": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(30)]
      })
    })
    this.formAdd = new FormGroup({
      "login": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(40)]
      }),
      "haslo": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(30)]
      }),
      "hasloPotwierdz": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(30)]
      })
    })
  }

  onSubmitPass() {
    if (this.formPass.invalid) {
      return;
    }

    this.authService.changePassword(this.formPass.value.aktualne, this.formPass.value.nowe)
  }

  onSubmitAdd() {
    if (this.formAdd.invalid) {
      return;
    }

    if (this.formAdd.value.haslo === this.formAdd.value.hasloPotwierdz) {
      this.authService.addNewAdmin(this.formAdd.value.login, this.formAdd.value.haslo)
    } else {
      alert('Pola hasło i potwierdź hasło są różne.')
    }

    
  }


}
