import {Application} from "express";
import getAllProductsController from '../controllers/get-products';
import postProductController from '../controllers/post-product';
import getProductController from '../controllers/get-product';
import getUsersController from '../controllers/get-users';
import getReviewsByProductController from '../controllers/get-reviews-by-product';

export default function addRoutesTo(app: Application): void {
    app.get('/api/products', getAllProductsController);
    app.get('/api/products/:id', getProductController);
    app.post('/api/products', postProductController);
    app.get('/api/users', getUsersController);
    app.get('/api/products/:id/reviews', getReviewsByProductController);
}
