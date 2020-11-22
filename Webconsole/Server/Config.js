// config.js
const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
  app: {
    port: 5000
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'db',
    path: './db/airflow.db'
  },
  jwtSecretKey: "0QyYwXN2NXpd47gq/IaaEYphBdJ98+J0DdUsX7q+zCkI",
  jwtIssuer: { issuer: "liang.faan@gmail.com" },
  elasticSearchUrl: "http://localhost:9200/"
};

const test = {
  app: {
    port: 5000
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'test'
  },
  jwtSecretKey: "0QyYwXN2NXpd47gq/IaaEYphBdJ98+J0DdUsX7q+zCkI",
  jwtIssuer: { issuer: "liang.faan@gmail.com" },
  elasticSearchUrl: "http://localhost:9200/"
};

const Config = {
  dev,
  test
};

module.exports = Config.dev;