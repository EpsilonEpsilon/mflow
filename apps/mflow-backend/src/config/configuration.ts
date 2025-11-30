import * as process from 'node:process';

export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    post: process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  hashing: {
    saltRounds: 10,
  },
  jwt: {
    refresh: {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_SECRET,
    },
    access: {
      expiresIn: '30m',
      secret: process.env.JWT_ACCESS_SECRET,
    },
  },
});
