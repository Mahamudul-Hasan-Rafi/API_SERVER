/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

/* eslint-disable no-underscore-dangle */
const fsData = require('../../lib/data');
const { hash, parseJson } = require('../../utilities');

const handler = {};
handler._user = {};

handler.userHandler = (reqObject, callback) => {
    const requestMethods = ['get', 'post', 'put', 'delete'];
    if (requestMethods.indexOf(reqObject.reqMethod) === -1) {
        callback(405);
    } else {
        handler._user[reqObject.reqMethod](reqObject, callback);
    }
};

handler._user.get = (reqObject, callback) => {
    const phone = typeof reqObject.queryString === 'string' && reqObject.queryString.trim().length === 11
                ? reqObject.queryString.trim()
                : false;

    if (phone) {
        fsData.read('users', phone, (err, data) => {
            if (!err) {
                const user = parseJson(data);
                delete user.password;
                callback(200, user);
            } else {
                callback(404, { message: 'Not Found' });
            }
        });
    } else {
        callback(401, { message: 'Bad Request' });
    }
};

handler._user.post = (reqObject, callback) => {
    if (reqObject.body === {}) {
        callback(401);
    } else {
        const firstName = typeof reqObject.body.firstName === 'string' && reqObject.body.firstName.trim().length > 0
                ? reqObject.body.firstName.trim()
                : false;

        const lastName = typeof reqObject.body.lastName === 'string' && reqObject.body.lastName.trim().length > 0
                ? reqObject.body.lastName.trim()
                : false;

        // eslint-disable-next-line eqeqeq
        const phone = typeof reqObject.body.phone === 'string' && reqObject.body.phone.trim().length == 11
                ? reqObject.body.phone.trim()
                : false;

        const password = typeof reqObject.body.password === 'string' && reqObject.body.password.trim().length > 0
                ? reqObject.body.password.trim()
                : false;

        const tosAgreement = typeof reqObject.body.tosAgreement === 'boolean' ? reqObject.body.tosAgreement : false;

        if (firstName && lastName && phone && password && tosAgreement) {
            const userData = {
                firstName,
                lastName,
                phone,
                password: hash(password),
                tosAgreement,
            };
            fsData.read('users', phone, (err) => {
                if (err) {
                    fsData.create('users', phone, userData, (err1) => {
                        if (!err1) {
                            callback(200, { message: 'User created Successfully' });
                        } else {
                            callback(500, { message: 'Server Side issue' });
                        }
                    });
                } else {
                    callback(500, { message: 'Server Side Error' });
                }
            });
        }
    }
};
handler._user.put = (reqObject, callback) => {
    if (reqObject.body === {}) {
        callback(401);
    } else {
        const firstName = typeof reqObject.body.firstName === 'string' && reqObject.body.firstName.trim().length > 0
                ? reqObject.body.firstName.trim()
                : false;

        const lastName = typeof reqObject.body.lastName === 'string' && reqObject.body.lastName.trim().length > 0
                ? reqObject.body.lastName.trim()
                : false;

        // eslint-disable-next-line eqeqeq
        const phone = typeof reqObject.body.phone === 'string' && reqObject.body.phone.trim().length == 11
                ? reqObject.body.phone.trim()
                : false;

        const password = typeof reqObject.body.password === 'string' && reqObject.body.password.trim().length > 0
                ? reqObject.body.password.trim()
                : false;

        const tosAgreement = typeof reqObject.body.tosAgreement === 'boolean' ? reqObject.body.tosAgreement : false;

        if (phone) {
            fsData.read('users', phone, (err, data) => {
                const user = parseJson(data);
                if (!err) {
                    if (firstName) {
                        user.firstName = firstName;
                    }
                    if (lastName) { user.lastName = lastName; }
                    if (password) { user.password = hash(password); }

                    fsData.update('users', phone, user, (err1) => {
                        if (!err1) {
                            callback(200, { message: 'Record Updated Successfully' });
                        } else {
                            callback(500, { message: 'Server Side Error' });
                        }
                    });
                } else {
                    callback(500, { message: 'Server Side Error' });
                }
            });
        }
        if (firstName && lastName && phone && password && tosAgreement) {
            const userData = {
                firstName,
                lastName,
                phone,
                password: hash(password),
                tosAgreement,
            };
        }
    }
};
handler._user.delete = (reqObject, callback) => {
    const phone = typeof reqObject.queryString === 'string' && reqObject.queryString.trim().length === 11
                ? reqObject.queryString.trim()
                : false;

    if (phone) {
        fsData.read('users', phone, (err) => {
            if (!err) {
                fsData.delete('users', phone, (err1) => {
                    if (err1) {
                        callback(500, { message: 'Server  Side Error' });
                    } else {
                        callback(200, { message: 'Record Successfully Deleted' });
                    }
                });
            } else {
                callback(404, { message: 'Not Found' });
            }
        });
    } else {
        callback(401, { message: 'Bad Request' });
    }
};

module.exports = handler.userHandler;
