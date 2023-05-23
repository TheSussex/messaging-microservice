import helmet from 'helmet';
import cors from 'cors';
import { json, urlencoded } from 'express';

const expressConfig = (app) => {
  app.use(cors());
  app.use(
    urlencoded({
      extended: true,
    }),
  );
  app.use(json());
  app.use(helmet());

  app.get('/', (req, res) => res.send({ message: 'Welcome' }));
};

export default expressConfig;
