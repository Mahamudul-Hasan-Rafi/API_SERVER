const environments = {};

environments.staging = {
    port: 5000,
    envName: 'staging',
    secretKey: 'normal',
};

environments.production = {
    port: 4000,
    envName: 'production',
    secretKey: 'heavy',
};

const current = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';
// eslint-disable-next-line operator-linebreak
const envToExp =
    typeof environments[current] === 'object' ? environments[current] : environments.staging;

module.exports = envToExp;
