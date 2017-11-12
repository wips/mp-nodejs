import * as express from 'express';
import addCookies from './middlewares/add-cookies';
import addQuery from './middlewares/add-query';
import addRoutesTo from './routes/routes';
import * as bodyParser from 'body-parser';
import userRegistry from './models/user-registry';
import User from "./models/User";

const app = express();

addUsers();
app.use(bodyParser.urlencoded({extended: true}));
app.use(addCookies);
app.use(addQuery);

addRoutesTo(app);

export default app;

function addUsers() {
    const qty= 10;
    for (let i = 0; i < qty; i++) {
        userRegistry.add(new User(Math.floor(Math.random() * qty).toString()));
    }
}
