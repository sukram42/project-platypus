import React from 'react';
import renderer from 'react-test-renderer';

import App from '../../src/js/views/index.component';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

test('App renders', () => {
  const component = renderer.create(
    <IndexCompany />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
