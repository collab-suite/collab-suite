import React from 'react';
import { shallow } from 'enzyme';
import Canvas from './canvas.js';
import configureStore from 'redux-mock-store'



describe('Canvas', () => {
    const initialState = {}
    const mockStore = configureStore()
    let store, container, wrapper

  beforeEach(() => {
      store = mockStore(initialState)
      container = shallow(<Canvas store={store} />)
  })

  it('should render correctly in "debug" mode', () => {
      expect(container.length).toEqual(1)
    });

  it('should render correctly in "debug" mode', () => {
    
      expect(container).toMatchSnapshot();
  });

  it('should load a .tab css property', () => {
    expect(container.find('.label')).toHaveLength(1);
});
  it('should load a .chk1 css property', () => {
    expect(container.find('#chk10000')).toBeDefined();
});
  it('should load a .chk2 css property', () => {
    expect(container.find('#chk2')).toBeDefined();
});
  it('should load a .chk3 css property', () => {
    expect(container.find('#chk3')).toBeDefined();
});
  it('chk1 should become visible after click', () => {
    const chk1 = container.find('#chk1')
    chk1.simulate('click')
    expect(wrapper.hasClass('tab-subActive'))
  });

});
