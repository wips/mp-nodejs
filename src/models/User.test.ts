import {stub, SinonStub} from 'sinon';
import {expect, use} from 'chai';
import User from './User';

use(require('sinon-chai'));

describe('User', () => {
    describe('#constructor', () => {
        let consoleLog: SinonStub;

        beforeEach(() => {
            consoleLog = stub(global.console, 'log');
        });

        it('logs itself', () => {
            new User(); // eslint-disable-line no-new
            expect(consoleLog).calledWith('User module');
        });

        afterEach(() => {
            consoleLog.restore();
        });
    });
});
