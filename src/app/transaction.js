/* eslint-disable consistent-return */
import logger from '../config/logger';
import * as cryptoService from './crypto-api';
import { getTransactionById, logRequest, saveNewTransaction } from './services';

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const queue = 'transactions';

    channel.assertQueue(queue, {
      durable: false,
    });

    logger.info('[*] Waiting for messages in transactions. To exit press CTRL+C');

    channel.consume(queue, async (msg) => {
      logger.info('[x] Received %s', msg.content.toString());

      const {
        type, clientId, transactionId, walletAddress, currencyType,
      } = JSON.parse(msg.content.toString());

      if (type === 'updateTransactions') {
        // check db for the transaction id, if it already exists, don't save to the db
        const transaction = await getTransactionById(transactionId);
        if (transaction) {
          logger.error('[*] Request Log already exist');
          return;
        }

        // log unique request to db
        const requestId = await logRequest([transactionId, clientId, walletAddress, currencyType]);

        // query crypto API
        const cryptoTxResponse = await cryptoService.getCryptoTransactions();

        // save transactions from crypto api
        await saveNewTransaction([...Object.values(requestId), ...Object.values(cryptoTxResponse)]);
        logger.info('[*] Transaction saved successfully');

        // publish event to event bus
        const newTransactionData = { type: 'newTransaction', ...cryptoTxResponse };
        // PublishToEventBus(newTransactionData); // hypotheethical event bus
      }
    }, {
      noAck: true,
    });
  });
});
