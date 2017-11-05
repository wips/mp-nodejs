import {createReadStream} from 'fs';
import * as through2 from 'through2';
import {resolve} from 'path';
import csv2 = require('csv2');
import {Readable} from 'stream';
import {ReadableStreamDescriptor} from "./utils-streams";
import {EOL} from 'os';

const {CSV_SEP, JSON_SEP} = require('../../config/app.json');

export function toJsonStream(file: string) {
    let i = 0;
    return createReadStream(resolve(file))
        .pipe(toNativeLineEndings())
        .pipe(csv2({separator: CSV_SEP}))
        .pipe(through2.obj(
            (chunk, _, cb) => cb(null, toJSONLine(i++, chunk)),
            (cb: Function) => cb(undefined, ']')
        ));
}

export function toReadableStreamDescriptor(path: string, stream: Readable): ReadableStreamDescriptor {
    return [path, stream];
}

export function toNativeLineEndings() {
    const eolPattern = /(?:\r\n|\r|\n)/g;
    return through2((chunk: Buffer, _, cb: Function) => cb(undefined, chunk.toString().replace(eolPattern, EOL)));
}

function toJSONLine(i: number, chunk: Buffer): string {
    const line = chunk
        .toString()
        .split(CSV_SEP)
        .map((value) => !isNaN(Number(value)) ? Number(value) : value);
    return `${i ? JSON_SEP : '['}${JSON.stringify(line)}`;
}
