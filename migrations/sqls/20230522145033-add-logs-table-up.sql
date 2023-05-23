/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS request_logs(
    id SERIAL,
    request_id VARCHAR PRIMARY KEY DEFAULT 'req-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() AS VARCHAR(50))
            , '-',''
        )
    ),
    transaction_id VARCHAR NOT NULL,
    client_id VARCHAR NOT NULL,
    wallet_address VARCHAR NOT NULL,
    currency_type VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY,
    transaction_id VARCHAR NOT NULL,
    request_id VARCHAR REFERENCES request_logs(request_id) NOT NULL,
    client_id VARCHAR NOT NULL,
    wallet_address VARCHAR NOT NULL,
    currency_type VARCHAR NOT NULL,
    amount INT NOT NULL,
    category VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);