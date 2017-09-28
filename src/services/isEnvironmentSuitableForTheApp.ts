import {promisify} from "util";

function isEnvironmentSuitableForTheApp(): boolean {
    return typeof promisify !== 'undefined';
}

export default isEnvironmentSuitableForTheApp;
