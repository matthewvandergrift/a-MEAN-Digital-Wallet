import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CardDetailsComponent } from './cards/card-details/card-details.component';
import { CardListComponent } from './cards/card-list/card-list.component';
import { CardService } from './cards/card.service';

@NgModule({
  declarations: [
    AppComponent,
    CardDetailsComponent,
    CardListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [CardService],
  bootstrap: [AppComponent],
})
export class AppModule { }
