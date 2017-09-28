import {watch} from 'fs';
import {debug, error as errorLog} from 'winston';
import {applicationWideBus} from './eventBusRegistry';
import {join} from 'path';

class DirWatcher {
    private delay: number = -1;
    private path: string = '';
    static WATCH_EVENT_NAME = 'ON_DIR_WATCHER_FS';
    static FS_EVENT_RENAME = 'rename';

    watch(path: string, delay: number): void {
        debug(`staring to watch "${path}"`);

        this.delay = delay;
        this.path = path;

        try {
            watch(path, {persistent: true}, this.onFsEvent.bind(this));
            debug(`started to watch "${path}"`);
        } catch (error) {
            errorLog(error);
        }
    }

    onFsEvent(event: string, filename: string): void {
        debug(`"${event}" event fired for "${filename}"`);
        if (event === DirWatcher.FS_EVENT_RENAME) {
            return;
        }
        const path = join(this.path, filename);
        applicationWideBus.emit(DirWatcher.WATCH_EVENT_NAME, {event, path});
    }
}

export default DirWatcher;
