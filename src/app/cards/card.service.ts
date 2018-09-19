import { Injectable } from '@angular/core';
import { Card } from './card';
import { Http, Response } from '@angular/http';

@Injectable()
export class CardService {
    private cardsUrl = '/api/cards';

    constructor (private http: Http) {}

    // get("/api/cards")
    getCards(): Promise<Card[]> {
      return this.http.get(this.cardsUrl)
                 .toPromise()
                 .then(response => response.json() as Card[])
                 .catch(this.handleError);
    }

    // post("/api/cards")
    createCard(newCard: Card): Promise<Card> {
      return this.http.post(this.cardsUrl, newCard)
                 .toPromise()
                 .then(response => response.json() as Card)
                 .catch(this.handleError);
    }

    // get("/api/cards/:id") endpoint not used by Angular app

    // delete("/api/cards/:id")
    deleteCard(delCardId: String): Promise<String> {
      return this.http.delete(this.cardsUrl + '/' + delCardId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/cards/:id")
    updateCard(putCard: Card): Promise<Card> {
      var putUrl = this.cardsUrl + '/' + putCard._id;
      return this.http.put(putUrl, putCard)
                 .toPromise()
                 .then(response => response.json() as Card)
                 .catch(this.handleError);
    }

    private handleError (error: any): Promise<any> {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console
      return Promise.reject(errMsg);
    }
}
