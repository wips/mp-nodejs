export default function getRegistryInstance<T extends IIdentifiable>(): IRegistry<T> {
    const registry: IDictionary<T> = {};

    return {
        add,
        get,
        getAll
    };

    function add(item: T) {
        registry[item.getId()] = item;
    }

    function get(id: string): T {
        return registry[id];
    }

    function getAll(): T[] {
        return Object.values(registry);
    }
};
