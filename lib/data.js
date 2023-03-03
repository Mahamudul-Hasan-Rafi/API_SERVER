const fs = require('fs');
const path = require('path');

const lib = {};

lib.basedir = path.join(__dirname, '/../.data');

lib.create = (dir, file, data, callback) => {
    fs.open(`${lib.basedir}/${dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if (!err2) {
                    fs.close(fileDescriptor, (err3) => {
                        if (err3) callback('Error closing to new file');
                        else callback(false);
                    });
                } else {
                    callback(err2);
                }
            });
        } else {
            callback(err);
        }
    });
};

lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir}/${dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    });
};

lib.update = (dir, file, data, callback) => {
    fs.open(`${lib.basedir}/${dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor, (err1) => {
                if (!err1) {
                    fs.writeFile(fileDescriptor, stringData, (err2) => {
                        if (!err2) {
                            fs.close(fileDescriptor, (err3) => {
                                if (err3) callback('File closing unsuccessful');
                                else {
                                    callback(false);
                                }
                            });
                        } else {
                            callback('Write unsuccessful');
                        }
                    });
                } else {
                    callback('Error in truncating');
                }
            });
        } else {
            callback('Error updating to file');
        }
    });
};

lib.delete = (dir, file, callback) => {
    fs.unlink(`${lib.basedir}/${dir}/${file}.json`, (err) => {
        callback(err);
    });
};

module.exports = lib;
