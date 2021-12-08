import 'dotenv/config';
import path from 'path';
import { createConnection } from 'typeorm';
import { __prod__ } from './constants/constants';

const main = async () => {
  try {
    await createConnection({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: !__prod__,
      logging: !__prod__,
      entities: [path.join(__dirname, 'entity/*.*')],
    });
  } catch (error) {
    console.log(error);
  }
};

main();
