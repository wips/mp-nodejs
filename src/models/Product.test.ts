import {stub, SinonStub} from 'sinon';
import {expect, use} from 'chai';
import Product from './Product';

use(require('sinon-chai'));

describe('Product', () => {
    describe('#constructor', () => {
        let consoleLog: SinonStub;

        beforeEach(() => {
            consoleLog = stub(global.console, 'log');
        });

        it('logs itself', () => {
            new Product('1'); // eslint-disable-line no-new
            expect(consoleLog).calledWith('Product module');
        });

        afterEach(() => {
            consoleLog.restore();
        });
    });
});
