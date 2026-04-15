import { Block } from './block.js';

export class BlockChain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const block = Block.mineBlock(this.getLastBlock(), data);
    this.chain.push(block);
    return block;
  }

  isValidChain(chain) {
    // 1. Validar que el bloque génesis sea idéntico
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

    // 2. Validar cada bloque sucesivo
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];

      // Verificamos el enlace (lastHash) y que el hash no haya sido manipulado
      if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) {
        return false;
      }
    }

    return true; // Si pasa todo el ciclo, la cadena es válida
  }
}
