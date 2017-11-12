import * as http from 'http';
import start from './server-start';

const port = 8030;
const server = http.createServer((_, res) => {
    const body = 'hello world';
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'text/plain'
    });
    res.end(body);
});

start(server, port);
