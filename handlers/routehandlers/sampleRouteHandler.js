const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(200, {
        message: 'Hello, I am Sample Handler',
    });
};

module.exports = handler;
