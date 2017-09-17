class Product {
    private static MODULE_NAME = 'Product';

    constructor() {
        Product.logMe(Product.MODULE_NAME);
    }

    static logMe(myName: string) {
        console.log(`${myName} module`); // eslint-disable-line no-console
    }
}

export default Product;
