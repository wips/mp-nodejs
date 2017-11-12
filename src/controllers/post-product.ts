import registry from '../models/product-registry';
import {NextFunction, Request, Response} from "express";
import Product from "../models/Product";

export default function postProductController(req: Request, res: Response, next: NextFunction) {
    const {id} = req.body;
    const product = new Product(id);
    res.writeHead(200, {'Content-Type': 'application/json'});
    registry.add(product);
    res.write(JSON.stringify(registry.get(id).serialize()));
    res.end();
    next();
}
