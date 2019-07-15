import React from 'react';
import { shallow, mount, render} from 'enzyme';
import Chat from './Chat.js';
import configureStore from 'redux-mock-store'



describe('Canvas', () => {
    const initialState = {}
    const mockStore = configureStore()
    let store, container

  beforeEach(() => {
      store = mockStore(initialState)
      container = shallow(<Chat store={store} />)
})

  it('should render correctly in "debug" mode', () => {
  
    expect(container.length).toMatchSnapshot();
  });

  it('should render correctly in "debug" mode', () => {
    expect(container.length).toEqual(1)
  });
  it('should load a canvas css property', () => {
    expect(container.find('.cool-stuff-bro')).toHaveLength(1);
});
});