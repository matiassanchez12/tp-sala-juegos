import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() openModalLogin = new EventEmitter();

  onClick() {
    this.openModalLogin.emit();
    console.log('first');
  }
}
