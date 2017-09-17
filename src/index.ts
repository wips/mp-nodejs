import {User, Product} from './models/';

const appConfig = require('../config/app.json');

console.log(`${appConfig.name} has started.`); // eslint-disable-line no-console

const user = new User();
const product = new Product();

console.log(user, product, ' we have to log it to pass the "never used check"'); // eslint-disable-line no-console
