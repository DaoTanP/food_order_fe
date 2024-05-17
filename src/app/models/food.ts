export class Food {
  constructor(
    public itemId: number = 0,
    public name: string = '',
    public description: string = '',
    public imageURL: string = '',
    public price: number = 0,
    public quantity: number = 0,
    public selected: boolean = false,
    // public category: string = '',

  ) {
    if (imageURL === '')
      imageURL = 'https://dummyimage.com/400x600/dddddd/aaa&text=No+image';
  }
}
