interface IDictionary<T> {
    [email: string]: T;
}

interface IIdentifiable {
    getId(): string;
}

interface IRegistry<T> {
    add(item: T): void,
    get(id: string): T,
    getAll(): T[]
}

type EntityDTO = {
    id: string
    'class'?: string
}

type Review = {
    text: string,
    date: Date
}
