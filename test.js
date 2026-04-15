import { Block } from './block.js';

describe('block', () => {
  let data, lastBlock, block;
  beforeEach(() => {
    data = 'bar';
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  });
  it('Set the data to match the input', () => {
    expect(block.data).toEqual(data);
  });
  it('Set the last hash to match the hash of the last block', () => {
    expect(block.lastHash).toEqual(lastBlock.hash); // Aquí debe ser lastBlock.hash
  });
});
