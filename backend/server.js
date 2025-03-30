const http = require('http');
const app = require('./app.js');

const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`The application is active at http://localhost:${PORT}`);
});

