import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.sass'
})
export class MainPageComponent {

  constructor(private router: Router) {}

  startTest() {
    this.router.navigate(['/test'])
  }

}
