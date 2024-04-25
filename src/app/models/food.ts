export class Food
{
    constructor(
        public id: string = '',
        public name: string = '',
        public description: string = '',
        public images: string[] = [],
        public price: number = 0,
        public tags: string = '',

    )
    {
        if (!images)
            images = ['https://dummyimage.com/400x600/dddddd/aaa&text=No+image'];
    }
}
