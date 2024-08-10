import { render } from '@testing-library/react';

import ReduxRequest from './redux-request';

describe('ReduxRequest', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ReduxRequest />);
        expect(baseElement).toBeTruthy();
    });
});
