const fs = require('node:fs')


const APP_HOST = 'localhost';
const APP_PORT = 9000;

const DATABASE_HOST = 'localhost';
const DATABASE_PORT = 3306;
const DATABASE_USER = 'root';
const DATABASE_PASSWORD = 'admin123';
const DATABASE_NAME = 'design-footerball'

const PRIVATE_KEY = fs.readFileSync('./keys/private.pem')
const PUBLIC_KEY = fs.readFileSync('./keys/public.pem')

module.exports = {
  APP_HOST,
  APP_PORT,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  PRIVATE_KEY,
  PUBLIC_KEY
}