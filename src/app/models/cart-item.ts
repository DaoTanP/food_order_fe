import { Food } from './food';

export class CartItem {
  constructor(public id: number, public item: Food, public quantity: number) {}
}
