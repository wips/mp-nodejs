import {resolve} from 'path';
import {createReadStream} from 'fs';
import * as http from 'http';
import * as through2 from 'through2';
import {sep} from 'path';
import start from './server-start';

const port = 8031;
const server = http.createServer((_, res) => {
    createReadStream(resolve(`src${sep}http-servers${sep}index.html`))
        .pipe(through2((chunk: Buffer, _, cb: Function) => cb(undefined, fillPlaceholders(chunk))))
        .pipe(res);
});

start(server, port);

function fillPlaceholders(chunk: Buffer): string {
    return chunk
        .toString()
        .replace(/{message}/ig, 'real message text');
}
