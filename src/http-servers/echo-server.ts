import * as net from 'net';
import start from './server-start';

const port = 8033;

const server = net.createServer((socket) => {
    socket.write('Echoing: ');
    socket.pipe(socket);
});

start(server, port, () => {
    for (let i = 0; i < 100; i++) {
        sendToSocket(i);
    }
});

function sendToSocket(i: number): void {
    const clientName = `Client #${i}`;
    const client = new net.Socket();
    client.connect(port, '127.0.0.1', () => {
        console.log(`${clientName} is connected`);
        client.write(`Server, hello from ${clientName}!`);
    });

    client.on('data', (data) => {
        console.log(`${clientName} received a message: ${data}`);
        client.destroy();
    });

    client.on('close', () => console.log(`${clientName} has closed the connection`));
}
