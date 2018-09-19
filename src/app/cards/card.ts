export class Card {
  _id?: string;
  name: string;
  memberSince: string;
  info: {
    number: string;
    expiration: string;
    cvv: string;
  }
}