import registry from '../models/product-registry';
import {NextFunction, Request, Response} from "express";

export default function getReviewsByProductController(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    const product = registry.get(id);
    if (product) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(product.getReviews()));
    } else {
        res.writeHead(404);
    }
    res.end();
    next();
}
