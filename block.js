import { time } from 'console';
import crypto from 'crypto';

export class Block {
  constructor(timestamp, lastHash, hash, data) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }
  toString() {
    return `Block:
 timestamp: ${this.timestamp}
 lastHash: ${this.lastHash}
 hash: ${this.hash}
 data: ${this.data}`;
  }
  static genesis() {
    return new this(0, '0'.repeat(64), '0'.repeat(64), []);
  }
  static mineBlock(lastBlock, data) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = this.hash(timestamp, lastHash, data); // después esto lo vas a calcular

    return new this(timestamp, lastHash, hash, data);
  }
  static hash(timestamp, lastHash, data) {
    const dataToHash = `${timestamp}${lastHash}${JSON.stringify(data)}`;
    return crypto.createHash('sha256').update(dataToHash).digest('hex');
  }

  static blockHash(block) {
    const { timestamp, lastHash, data } = block;
    return Block.hash(timestamp, lastHash, data);
  }
}
