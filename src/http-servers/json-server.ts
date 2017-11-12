import * as http from 'http';
import start from './server-start';

const port = 8032;
const server = http.createServer((_, res) => {
    const body = JSON.stringify(getPojo());
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'application/json'
    });
    res.end(body);
});

start(server, port);

function getPojo() {
    return {id: 1,name: 'Supreme T-Shirt',brand: 'Supreme',price: 99.99,options: [{ color: 'blue'},{ size: 'XL'}]};
}
