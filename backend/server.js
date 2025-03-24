import http from 'http';
import app from './app';

const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`The application is active at http://localhost:${PORT}`);
});

