import { Food } from './food';

export class CartItem {
  constructor(
    public item: Food,
    public quantity: number,
    public selected: boolean
  ) {}
}
