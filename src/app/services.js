import { db } from '../config/db';
import queries from './queries';

export const getTransactionById = (payload) => db.oneOrNone(queries.getTransactionById, payload);
export const logRequest = (payload) => db.oneOrNone(queries.logRequest, payload);
export const saveNewTransaction = (payload) => db.oneOrNone(queries.saveNewTransaction, payload);
export const getUserTransactions = (payload) => db.any(queries.getUserTransactions, payload);
