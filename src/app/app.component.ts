import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DbServiceService } from './services/db-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public openOptionsMovie: boolean = false;
  public openOptionsActors: boolean = false;
  public subscriptionArrrayMovies: Subscription = new Subscription();

  constructor(private bdService: DbServiceService) {}

  public getMovies() {}

  public toggleOptionsMovie() {
    this.openOptionsMovie = !this.openOptionsMovie;
  }

  public toggleOptionsActors() {
    this.openOptionsActors = !this.openOptionsActors;
  }

  public handleBlurModal(modal: string) {
    switch (modal) {
      case 'movies':
        if (this.openOptionsMovie) this.openOptionsMovie = false;
        break;
      case 'actors':
        if (this.openOptionsActors) this.openOptionsActors = false;
        break;
      default:
        break;
    }
  }
}
