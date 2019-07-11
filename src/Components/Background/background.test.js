import React from 'react';
import { shallow } from 'enzyme';
import Background from './background.js';
describe('Background', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Background debug />);
  
    expect(component).toMatchSnapshot();
  });
});
