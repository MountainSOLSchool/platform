import { pdfGenerate } from './pdf-generate';

describe('pdfGenerate', () => {
    it('should work', () => {
        expect(pdfGenerate()).toEqual('pdf-generate');
    });
});
