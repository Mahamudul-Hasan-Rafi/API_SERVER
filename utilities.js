const crypto = require('crypto');
const environment = require('./helper/environments');

const utilities = {};

// eslint-disable-next-line consistent-return
utilities.parseJson = (data) => {
    try {
        return JSON.parse(data);
    } catch {
        return {};
    }
};

utilities.hash = (str) => {
    const hash = crypto.createHmac('sha256', environment.secretKey).update(str).digest('hex');
    return hash;
};

module.exports = utilities;
