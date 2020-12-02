import cors from 'cors';
import './config/dbEvents.js';
import 'dotenv/config.js';
import logger from './config/logger.js';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './routes/routes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', routes);

app.get('/', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'Welcome to Book Store Application',
  });
});

// Handler for Global Errors
app.use((err, req, res, next) => {
  if (!err) {
    return next();
  }
  res.status(500).send({
    success: false,
    message: '500, Internal Server Error',
  });
});

// Handler for non-existence routes
app.use('*', (req, res) => {
  res.status(404).send({
    success: false,
    message: 'Page Does not exist',
  });
});

/**
 * Server
 */

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
  logger.info(`Listening on port ${process.env.PORT}...`);
});
