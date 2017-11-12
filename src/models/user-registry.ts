import getRegistryInstance from './generic-registry-factory';
import User from "./User";

const registry: IRegistry<User> = getRegistryInstance<User>();

export default registry;
