import { Component, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

@NgModule({
  schemas:[NO_ERRORS_SCHEMA]
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'a MEAN Digital Wallet';
}
