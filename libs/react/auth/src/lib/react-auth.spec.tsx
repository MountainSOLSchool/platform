import { render } from '@testing-library/react';

import ReactAuth from './react-auth';

describe('ReactAuth', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ReactAuth />);
        expect(baseElement).toBeTruthy();
    });
});
