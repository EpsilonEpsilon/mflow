import * as process from 'node:process';

export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    post: process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
});
