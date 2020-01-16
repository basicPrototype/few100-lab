// import { add } from './utils';
import { parsePercent } from '../src/util';

// describe('writing specs in typescript', () => {
//     it('is easy', () => {
//         expect(true).toBe(false);
//     });
//     it('can add', () => {
//         expect(add(2, 2)).toBe(5);
//     });
// });

describe('util tests', () => {
    it('should extract percentage given format x%', () => {
        const testValue = '50%';
        expect(parsePercent(testValue)).toBeCloseTo(.5, 2);
        console.log(parsePercent(testValue));
    });
});
