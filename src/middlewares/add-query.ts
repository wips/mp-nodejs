import {Request, Response, NextFunction} from "express";

export default function addQuery(req: Request, res: Response, next: NextFunction): void {
    Object.assign(res, {parsedQuery: req.query});
    next();
}
