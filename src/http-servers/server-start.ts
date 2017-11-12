import {Server} from "net";

export default function startServer(server: Server, port: number, callback?: Function): void {
    server.listen(port, (err: string) => {
        if (err) {
            return console.log('something bad happened', err);
        }
        console.log(`server is listening on ${port}`);

        if (callback) {
            callback();
        }
    });
}
