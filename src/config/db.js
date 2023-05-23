import 'dotenv/config';
import pgp from 'pg-promise';
import promise from 'bluebird';

const pg = pgp({ promiseLib: promise, noWarnings: true });
const db = pg('postgresql://localhost/messaging_microservice');

export { db };
