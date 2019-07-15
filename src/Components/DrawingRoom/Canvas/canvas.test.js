import React from 'react';
import { shallow, mount, render} from 'enzyme';
import Canvas from './canvas.js';
import configureStore from 'redux-mock-store'



describe('Canvas', () => {
    const initialState = {}
    const mockStore = configureStore()
    let store, container, wrapper

  beforeEach(() => {
      store = mockStore(initialState)
      container = render(<Canvas store={store} />)
  })

  it('should render correctly in "debug" mode', () => {
      expect(container.length).toEqual(1)
    });

  // it('should render correctly in "debug" mode', () => {
    
  //     expect(container).toMatchSnapshot();
  // });

  it('should load a .tab css property', () => {
    expect(container.find('.tab-sliderText')).toHaveLength(9);
});
  it('should load a .tab slideBdy css property', () => {
    expect(container.find('.tab-slideBody')).toHaveLength(2);
});
  it('should load a canvas css property', () => {
    expect(container.find('.cool-stuff-bro')).toHaveLength(1);
});



});
