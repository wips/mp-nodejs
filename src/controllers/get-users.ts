import registry from '../models/user-registry';
import {NextFunction, Request, Response} from "express";

export default function getProductsController(_: Request, res: Response, next: NextFunction) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(registry.getAll()));
    res.end();
    next();
}
