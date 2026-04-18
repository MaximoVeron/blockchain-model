import express from 'express';
import { BlockChain } from '../blockchain/blockChain.js';
import 'dotenv/config';
import { p2pServer } from './p2p.server.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const bc = new BlockChain();
const P2PServer = new p2pServer(bc);

app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body);
  console.log({ data: block });
  res.redirect('/blocks');
});

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});

P2PServer.listen();
