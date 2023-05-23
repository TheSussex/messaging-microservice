import 'dotenv/config';
import express from 'express';
import { fetchTransactions, getTransactionValidation, validateInputData } from './app/controller';
import expressConfig from './config/express';
import logger from './config/logger';

const app = express();

const { PORT } = process.env;
expressConfig(app);

const server = app.listen(PORT, () => {
  logger.info(`Server started on ${PORT}`);
});

app.get('/', (req, res) => {
  res.send({ message: 'Welcome' });
});

app.get('/api/transactions', validateInputData(getTransactionValidation), fetchTransactions);

export default server;
