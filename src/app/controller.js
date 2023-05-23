import Joi from 'joi';
import logger from '../config/logger';
import { getUserTransactions } from './services';

export const getTransactionValidation = Joi.object().keys({
  clientId: Joi.string().required(),
});

export const validateInputData = (schema) => async (req, res, next) => {
  try {
    const options = { language: { key: '{{key}} ' } };

    const isValid = await schema.validate(req.query, options);

    if (!isValid.error) {
      return next();
    }

    const { message } = isValid.error.details[0];

    return res.json({
      status: 'error',
      message: message.replace(/["]/gi, ''),
      code: 422,
    });
  } catch (error) {
    logger.error(error);
    return res.json({
      status: 'error',
      message: error.message ? error.message : 'There was an error',
      code: 500,
    });
  }
};

export const fetchTransactions = async (req, res, next) => {
  try {
    const data = await getUserTransactions(req.query.clientId);

    logger.info('Info: all transactions fetched successfully');
    return res.json({
      status: 'success',
      message: 'Transactions fetched successfully',
      code: 200,
      data,
    });
  } catch (error) {
    return res.json({
      status: 'error',
      message: error.message ? error.message : 'There was an error',
      code: 500,
    });
  }
};
