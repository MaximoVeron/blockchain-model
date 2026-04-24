import { WebSocketServer, WebSocket } from "ws";
import { BlockChain } from "../blockchain/blockChain.js";
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];
const p2pPORT = process.env.P2P_PORT || 5001;

export class p2pServer {
  constructor(BlockChain) {
    this.BlockChain = BlockChain;
    this.sockets = [];
  }
  listen() {
    const server = new WebSocketServer({ port: p2pPORT });

    server.on("connection", (socket) => {
      this.connectSocket(socket);
    });
    this.connectToPeers();
    console.log(`Listening for p2p connections on: ${p2pPORT}`);
  }

  connectToPeers() {
    peers.forEach((peer) => {
      const socket = new WebSocket(peer);
      socket.on("open", () => {
        this.connectSocket(socket);
      });

      // Es bueno añadir manejo de errores para que no crashé el app si un peer está caído
      socket.on("error", (err) => console.log(`Connection to ${peer} failed.`));
    });
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    this.messageHandler(socket);
    this.sendChain(socket);
  }

  messageHandler(socket) {
    socket.on("message", (message) => {
      const data = JSON.parse(message.toString()); // Convertir a string explícitamente
      this.BlockChain.replaceChain(data);
    });
  }

  sendChain(socket) {
    socket.send(JSON.stringify(this.BlockChain.chain));
  }

  syncChains() {
    this.sockets.forEach((socket) => {
      this.sendChain(socket);
    });
  }
}

// para establecer la conexion desde la misma maquina
/*
    $env:HTTP_PORT=3002
    $env:P2P_PORT=5002
    $env:PEERS="ws://localhost:5001"
    npm run dev
*/
