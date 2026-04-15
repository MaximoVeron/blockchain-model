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
    return new this(Date.now(), '0'.repeat(64), '0'.repeat(64), []);
  }
  static mineBlock(lastBlock, data) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = '0'.repeat(3); // después esto lo vas a calcular

    return new this(timestamp, lastHash, hash, data);
  }
}
