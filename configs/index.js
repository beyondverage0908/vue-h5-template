const devConfig = require('./config.dev');
const prodConfig = require('./config.prod');
const testingConfig = require('./config.testing');

const env = process.env.NODE_ENV || 'development';
console.log('当前编译环境', env);
const configs = {
    development: devConfig,
    testing: testingConfig,
    production: prodConfig
};

const config = configs[env];

module.exports = config;
