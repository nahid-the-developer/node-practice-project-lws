const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes')
const environment = require('./helpers/environment')

const app = {};

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`Server running at http://localhost:${environment.port}`)
    })
}

app.handleReqRes = handleReqRes;

app.createServer();