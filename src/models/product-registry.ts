import getRegistryInstance from './generic-registry-factory';
import Product from "./Product";

const registry: IRegistry<Product> = getRegistryInstance<Product>();

export default registry;
