import { Component, OnInit, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';

@NgModule({
  schemas: [ NO_ERRORS_SCHEMA ]
})

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
  providers: [CardService],
})

export class CardListComponent implements OnInit {

  cards: Card[]
  selectedCard: Card

  constructor(private cardService: CardService) { }

  ngOnInit() {
     this.cardService
      .getCards()
      .then((cards: Card[]) => {
        this.cards = cards.map((card) => {
          if (!card.info) {
            card.info = {
              number: '',
              expiration: '',
              cvv:'',
            }
          }
          return card;
        });
      });
  }

  private getIndexOfCard = (cardId: String) => {
    return this.cards.findIndex((card) => {
      return card._id === cardId;
    });
  }

  selectCard(card: Card) {
    this.selectedCard = card
  }

  createNewCard() {
    var card: Card = {
      name: '',
      info: {
        number: '',
        expiration: '',
        cvv: ''
      }
    };

    // By default, a newly-created card will have the selected state.
    this.selectCard(card);
  }

  deleteCard = (cardId: String) => {
    var idx = this.getIndexOfCard(cardId);
    if (idx !== -1) {
      this.cards.splice(idx, 1);
      this.selectCard(null);
    }
    return this.cards;
  }

  addCard = (card: Card) => {
    this.cards.push(card);
    this.selectCard(card);
    return this.cards;
  }

  updateCard = (card: Card) => {
    var idx = this.getIndexOfCard(card._id);
    if (idx !== -1) {
      this.cards[idx] = card;
      this.selectCard(card);
    }
    return this.cards;
  }
}