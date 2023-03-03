const http = require('http');
const { handleReq } = require('./helper/handleReqRes');
const environment = require('./helper/environments');
const data = require('./lib/data');

const app = {};

// data.create('test', 'newFile', { name: 'Rafi', age: 24 }, (err) => {
//     console.log(err);
// });

// data.read('test', 'newFile', (err, readData) => {
//     console.log(readData);
// });

// data.update('test', 'newFile', { name: 'Mahamudul Hasan Rafi', age: 24 }, (err) => {
//     console.log(err);
// });

data.delete('test', 'newFile', (err) => console.log(err));

app.createServer = () => {
    const server = http.createServer(app.handleReq);
    server.listen(environment.port, () => {
        console.log(`${environment.envName} Server listening to ${environment.port} port`);
    });
};

app.handleReq = handleReq;
app.createServer();
