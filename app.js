import { Block } from './block.js';

// block genesis funciona como lastBlock
const fooBlock = Block.mineBlock(Block.genesis(), 'data');
console.log(fooBlock.toString());
