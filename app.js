import { Block } from './block.js';
import crypto from 'crypto';

// for (let i = 1; i < 10; i++) {
//   const b = new block(Date.now(), '0'.repeat(3), '0'.repeat(3), 'hola' + i);
//   console.log(b.toString());
// }

const fooBlock = Block.mineBlock(Block.genesis(), 'maximo');
console.log(fooBlock.toString());

const hash = crypto.createHash('sha256').update('hola').digest('hex');

console.log(hash);
