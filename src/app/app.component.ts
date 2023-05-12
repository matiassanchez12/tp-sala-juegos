import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DbService } from './services/db-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public isModalLoginOpen: boolean = false;
  public openOptionsMovie: boolean = false;
  public openOptionsActors: boolean = false;
  public subscriptionArrrayMovies: Subscription = new Subscription();

  constructor() {}

  openModalLogin() {
    this.isModalLoginOpen = false;
  }

  public handleBlurModal(modal: string) {
    switch (modal) {
      case 'movies':
        if (this.openOptionsMovie) this.openOptionsMovie = false;
        break;
      case 'actors':
        if (this.openOptionsActors) this.openOptionsActors = false;
        break;
      case 'login':
        if (this.isModalLoginOpen) this.isModalLoginOpen = false;
        break;
      default:
        break;
    }
  }
}
