import {ParsedArgs} from 'minimist';
import helpMessageText from './helpMessageText';

export const isAction = {
    help,
    out,
    transform,
    createJson,
    transformFile,
    cssBundle
};

function help(argv: ParsedArgs): boolean {
    return !Object.keys(argv).filter((key) => key !== '_').length
        || argv.hasOwnProperty('help');
}

function out(argv: ParsedArgs): boolean {
    return !!argv.file;
}

function transform(argv: ParsedArgs): boolean {
    return argv.action === 'transform';
}

function createJson({action, file}: ParsedArgs): boolean {
    return action === 'to-json-file' && !!file;
}

function transformFile({action, file}: ParsedArgs): boolean {
    return action === 'transform-file' && !!file;
}

function cssBundle({action, path}: ParsedArgs): boolean {
    return action === 'bundle-css' && !!path;
}

export function printHelpMessage() {
    process.stdout.write(helpMessageText);
}

export function getOptions() {
    return  {
        alias: {
            h: 'help',
            a: 'action',
            f: 'file',
            p: 'path'
        }
    };
}
