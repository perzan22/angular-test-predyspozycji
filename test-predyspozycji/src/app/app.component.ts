import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'Test predyspozycji';

  constructor(private router: Router) {}

  isAdminPage(): boolean {
    return this.router.url.includes('/admin')
  }

  getLayoutClass(): string {
    return this.router.url.includes('/admin') ? 'admin-layout' : 'main-layout'
  }
}
