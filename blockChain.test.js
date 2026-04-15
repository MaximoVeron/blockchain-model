import { BlockChain } from './blockChain.js';
import { Block } from './block.js';

describe('blockchain', () => {
  let bc, bc2;
  beforeEach(() => {
    bc = new BlockChain();
    bc2 = new BlockChain();
  });
  it('Start the genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });
  it('Adds the new block', () => {
    const data = '123';
    bc.addBlock(data);
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });
  it('Validate a valid chain', () => {
    bc2.addBlock('foo');
    expect(bc2.isValidChain(bc2.chain)).toBe(true);
  });
  it('Validate a chain with a corrupt finished block', () => {
    bc2.chain[0].data = 'hola';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });
  it('Invalidate a corrupt chain', () => {
    bc2.addBlock('foo');
    bc2.chain[1].data = 'asda';
    expect(bc2.isValidChain(bc2.chain)).toBe(false);
  });
});
