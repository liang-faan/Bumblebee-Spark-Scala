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
   path: '/Users/lanphan/airflow/airflow.db'
 }
};

const test = {
 app: {
   port: 5000
 },
 db: {
   host: 'localhost',
   port: 27017,
   name: 'test'
 }
};

const Config = {
 dev,
 test
};

module.exports = Config.dev;