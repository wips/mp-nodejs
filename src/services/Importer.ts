import {readFile, readFileSync} from 'fs';
import DirWatcher from "./DirWatcher";
import {promisify} from 'util';
import FormatConverter from './FormatConverter';
import {info, debug} from 'winston';
import {applicationWideBus} from './eventBusRegistry';

class Importer {

    constructor() {
        applicationWideBus.on(DirWatcher.WATCH_EVENT_NAME, Importer.fireImport);
        debug('Importer is instantiated');
    }

    static fireImport({path}: DirChangeEvent): void {
        Importer.import(path)
            .then((json) => info(`Async (${path}): `, JSON.stringify(json)));

        const json = Importer.importSync(path);
        info(`Sync (${path}): `, JSON.stringify(json));
    }

    static import(path: string): Promise<JSON> {
        return promisify(readFile)(path)
            .then(FormatConverter.csvBufferToJson);
    }

    static importSync(path: string): JSON {
        const buffer = readFileSync(path);
        return FormatConverter.csvBufferToJson(buffer);
    }
}

export default Importer;
