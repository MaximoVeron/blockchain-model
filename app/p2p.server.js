import { WebSocketServer, WebSocket } from 'ws';
import { BlockChain } from '../blockchain/blockChain.js';
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
const p2pPORT = process.env.P2P_PORT || 5001;

export class p2pServer {
  constructor(BlockChain) {
    this.BlockChain = BlockChain;
    this.sockets = [];
  }
  listen() {
    const server = new WebSocketServer({ port: p2pPORT });

    server.on('connection', (socket) => {
      this.connectSocket(socket);
    });
    this.connectToPeers();
    console.log(`Listening for p2p connections on: ${p2pPORT}`);
  }

  connectToPeers() {
    peers.forEach((peer) => {
      const socket = new WebSocket(peer);
      socket.on('open', () => {
        this.connectSocket(socket);
      });

      // Es bueno añadir manejo de errores para que no crashé el app si un peer está caído
      socket.on('error', (err) => console.log(`Connection to ${peer} failed.`));
    });
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    console.log('[+]socket connected');
  }
  connectToPeers() {
    peers.forEach((peer) => {
      const socket = new WebSocket(peer);
      socket.on('open', () => {
        this.connectSocket(socket);
      });
    });
  }
}
