import {ParsedArgs} from 'minimist';
import {resolve} from 'path';
import {createReadStream, createWriteStream, readdir} from 'fs';
import {sep} from 'path';
import * as through2 from 'through2';
import {EOL} from 'os';
import * as http from "http";
import {Writable} from "stream";
import {ReadableStreamDescriptor} from "./utils-streams";
import {toNativeLineEndings, toJsonStream, toReadableStreamDescriptor} from "./mappers";

const {EXTENSION_SEP, BUNDLE_CSS_NAME, EXTERNAL_CSS_URL} = require('../../config/app.json');

export function inputOutput({file}: ParsedArgs): void {
    createReadStream(resolve(file))
        .pipe(toNativeLineEndings())
        .pipe(process.stdout);
}

export function transform(): void {
    process.stdin
        .pipe(toNativeLineEndings())
        .pipe(through2((chunk: Buffer, _, cb: Function) => cb(undefined, chunk.toString().toUpperCase())))
        .pipe(process.stdout);
}

export function convertToJsonFile({file}: ParsedArgs): void {
    const [nameWithoutExtension] = resolve(file).split(EXTENSION_SEP);
    const fileName = resolve(`${nameWithoutExtension}${EXTENSION_SEP}json`);
    toJsonStream(file)
        .pipe(createWriteStream(fileName))
        .on('close', () => console.log(`File is written: ${fileName}`));
}

export function bundleCss({path}: ParsedArgs): void {
    const fullPath = resolve(path);
    readdir(fullPath, (err, files) => {
        if (!err) {
            const filesToBundle = files
                .filter((file) => file !== BUNDLE_CSS_NAME)
                .map((file) => resolve(`${fullPath}${sep}${file}`));
            bundleFiles(filesToBundle, fullPath);
            return;
        }
        console.log(err);
    });
}

function bundleFiles(files: string[], destinationFolder: string): void {
    const destination = createWriteStream(`${destinationFolder}${sep}${BUNDLE_CSS_NAME}`);
    const fileStreamDescriptors = files
        .map((file) => resolve(file))
        .map((path) => toReadableStreamDescriptor(path, createReadStream(path)));

    http.get(EXTERNAL_CSS_URL, (response) => {
        writeStreams([
            ...fileStreamDescriptors,
            toReadableStreamDescriptor(EXTERNAL_CSS_URL, response)
        ], destination);
    });
}

function writeStreams(streamsToWrite: ReadableStreamDescriptor[], destination: Writable): void {
    const streamToWrite = streamsToWrite.shift();
    if (streamToWrite === undefined) {
        return destination.end();
    }
    const [path, readableStream] = streamToWrite;
    destination.write(`${EOL}/* Start: ${path} */${EOL}`);
    readableStream
        .on('error', (err) => destination.write(`/* ${err} */`))
        .on('end', () => {
            destination.write(`${EOL}/* End: ${path} */${EOL}`);
            writeStreams(streamsToWrite, destination);
        })
        .pipe(toNativeLineEndings())
        .pipe(destination, {end: false});
}

export function transformFile({file}: ParsedArgs): void {
    toJsonStream(file)
        .pipe(process.stdout);
}
