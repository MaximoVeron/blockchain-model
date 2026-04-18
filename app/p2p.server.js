import WebSocket from 'ws';
import { BlockChain } from '../blockchain/blockChain';
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
const p2pPORT = process.env.P2P_PORT || 5001;

export class p2pServer {
  constructor(BlockChain) {
    this.BlockChain = BlockChain;
    this.sockets = [];
  }
  listen() {
    const server = new WebSocket.Server({ port: p2pPORT });

    // Cuando alguien se conecta a nosotros:
    server.on('connection', (socket) => {
      this.connectSocket(socket);
      this.connectToPeers();
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
