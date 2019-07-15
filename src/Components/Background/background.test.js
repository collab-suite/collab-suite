import React from 'react';
import { render } from 'enzyme';
import Background from './background.js';
describe('background', () => {

  let container
  
beforeEach(() => {
    container = render(<Background />)
})

  it('should render correctly in "debug" mode', () => {
  
    expect(container.length).toMatchSnapshot();
  });

  it('should render correctly in "debug" mode', () => {
    expect(container.length).toEqual(1)
  });

});
