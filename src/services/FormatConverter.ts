import {EOL} from 'os';

class FormatConverter {

    static csvBufferToJson(csv: Buffer): JSON {
        const pojo: Matrix2D<string> = csv
            .toString()
            .split(EOL)
            .map((line) => line.split(','));

        return JSON.parse(JSON.stringify(pojo));
    }
}

export default FormatConverter;
