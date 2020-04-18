import socketIOClient from 'socket.io-client';

const socketConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  transports: ['websocket'],
  path: '/data',
};
export default socketIOClient('http://127.0.0.1:8000', socketConfig);
