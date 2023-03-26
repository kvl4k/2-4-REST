import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from './routes/routes';
import mongoose from 'mongoose';
import session from 'express-session';
import FileStoreConstructor from 'session-file-store'

const host = '127.0.0.1';
const port = 3005;

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());

//винести в types.d.s
declare module "express-session" {
    interface SessionData {
        user: string;
    }
}


const fileStore = FileStoreConstructor(session);
app.use(session({
    store: new fileStore({}),
    secret: 'dvADxeHbjIOpNhsyawei',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
    }
}));

app.get('/', (req, res) => {
    res.sendFile('/static/index.html');
});


app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
);

//MongoDB 
const username = "user";
const password = "ohcvKD32kTEff86C";
let uri = `mongodb+srv://${username}:${password}@todoapp.hoamkqz.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri);

app.use('/api', router);
