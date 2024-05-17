export class Category {
  constructor(
    public categoryId: number = 0,
    public categoryName: string = '',
    public imageURL: string = '',

  ) {
    if (imageURL === '')
      imageURL = 'https://dummyimage.com/400x600/dddddd/aaa&text=No+image';
  }
}
