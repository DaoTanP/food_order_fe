export class Food
{
    constructor(
        public id: number = 0,
        public name: string = '',
        public description: string = '',
        public images: string[] = [],
        public price: number = 0,
        public quantity: number = 0,
        // public category: string = '',

    )
    {
        if (images.length === 0)
            images = ['https://dummyimage.com/400x600/dddddd/aaa&text=No+image'];
    }
}
