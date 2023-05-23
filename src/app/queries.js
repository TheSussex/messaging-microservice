export default {
  getTransactionById: `
    SELECT
    *
    FROM request_logs
    WHERE transaction_id = $1`,

  logRequest: `
    INSERT INTO request_logs
        (transaction_id, client_id, wallet_address, currency_type)
      VALUES($1, $2, $3, $4)
    RETURNING request_id`,

  saveNewTransaction: `
    INSERT INTO transactions
        (request_id, transaction_id, client_id, wallet_address, currency_type, amount, category)
      VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,

  getUserTransactions: `
    SELECT
    *
    FROM request_logs
    WHERE client_id = $1`,
};
