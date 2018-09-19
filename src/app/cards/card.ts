export class Card {
  _id?: string;
  name: string;
  info: {
    number: string;
    expiration: string;
    cvv: string;
  }
}