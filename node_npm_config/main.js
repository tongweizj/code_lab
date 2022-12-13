const config = require('config');

const dbConfig = config.get('Customer.dbConfig');
console.log(dbConfig);

