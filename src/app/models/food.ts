export class Book
{
    constructor(
        public _id: string = '',
        public title: string = '',
        public overview: string = '',
        public images: string[] = [],
        public price: number = 0

    )
    {
        if (!images)
            images = ['https://dummyimage.com/400x600/dddddd/aaa&text=No+image'];
    }
}
