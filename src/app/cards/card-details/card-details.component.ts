import { Component, Input, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';

@NgModule({
  schemas: [ NO_ERRORS_SCHEMA ]
})

@Component({
  selector: 'card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})

export class CardDetailsComponent {
  @Input()
  card: Card;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private cardService: CardService) {}

  createCard(card: Card) {
    this.cardService.createCard(card).then((newCard: Card) => {
      this.createHandler(newCard);
    });
  }

  updateCard(card: Card): void {
    this.cardService.updateCard(card).then((updatedCard: Card) => {
      this.updateHandler(updatedCard);
    });
  }

  deleteCard(cardId: String): void {
    this.cardService.deleteCard(cardId).then((deletedCardId: String) => {
      this.deleteHandler(deletedCardId);
    });
  }
}