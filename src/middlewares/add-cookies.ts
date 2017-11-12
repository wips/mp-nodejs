import {Request, Response, NextFunction} from "express";

export default function addCookies(req: Request, res: Response, next: NextFunction): void {
    Object.assign(res, {parsedCookie: getParsedCookie(req)});
    next();
}

function getParsedCookie(req: Request): string {
    return (req.cookies || '')
        .split(';')
        .reduce((memo: IDictionary<string>, pair: string) => {
            const [key, value] = pair.split('=');
            memo[key] = value;
            return memo;
        }, {});
}
