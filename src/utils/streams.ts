#!/usr/local/bin/node

import * as minimist from 'minimist';
import {isAction, getOptions, printHelpMessage} from './cliUtils';
import {bundleCss, convertToJsonFile, transformFile, inputOutput, transform} from './actions';

const argv = minimist(process.argv.slice(2), getOptions());

if (!isThisFileImportedToAnotherOne()) {
    if (isAction.cssBundle(argv)) {
        bundleCss(argv);
    } else if (isAction.createJson(argv)) {
        convertToJsonFile(argv);
    } else if (isAction.transformFile(argv)) {
        transformFile(argv);
    } else if (isAction.help(argv)) {
        printHelpMessage();
    } else if (isAction.out(argv)) {
        inputOutput(argv);
    } else if (isAction.transform(argv)) {
        transform();
    }
}

function isThisFileImportedToAnotherOne(): boolean {
    return !!module.parent;
}

export default {
    convertToJsonFile,
    inputOutput,
    transformFile,
    transform,
    printHelpMessage
}
