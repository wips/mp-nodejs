type DirChangeEvent = {event: string, path: string};
type Matrix2D<T> = T[][];

interface IDirWatcher {
    watch(path: string, delay: number): void;
}
