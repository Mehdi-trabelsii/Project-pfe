import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import methodOverride from 'method-override';
import morgan from 'morgan';
import passport from 'passport';
import RateLimit from 'express-rate-limit';
import { notFound } from '../middlewares/error';
import routes from '../routes';
import strategies from './passport';
import { logs } from './vars';


const apiLimiter = new RateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 50,
    skipSuccessfulRequests: true,
    message: { status: 'REQUEST_DENIED', errorCode: 'TOO_MANY_REQUESTS' },
  });

const app = express();

app.use(apiLimiter);

app.use(morgan(logs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(compress());

app.use(methodOverride());

app.use(helmet());

app.use(cors());

app.use(passport.initialize());
passport.use('jwt', strategies.jwt);

app.use('/v1', routes);

app.use(notFound);

export default app;