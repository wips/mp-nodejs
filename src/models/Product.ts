class Product {
    private static MODULE_NAME = 'Product';
    private id: string;
    private reviews: Review[] = [];

    constructor(id: string) {
        this.id = id;
        this.reviews.push({
            text: `See my date to know when I was created`,
            date: new Date()
        });
        Product.logMe(Product.MODULE_NAME);
    }

    public getId(): string {
        return this.id;
    }

    public serialize(): EntityDTO {
        return {id: this.getId()};
    }

    public getReviews(): Review[] {
        return this.reviews;
    }

    static logMe(myName: string) {
        console.log(`${myName} module`); // eslint-disable-line no-console
    }
}

export default Product;
