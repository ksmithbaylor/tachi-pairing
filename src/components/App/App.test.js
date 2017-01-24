import React from 'react';
import { render } from 'react-dom';

import App from '.';

it('renders without blowing up on zero props', () => {
  const div = document.createElement('div');
  render(<App />, div);
});

it('renders a loading message', () => {
  [
    { loading: true, devs: undefined, pairs: undefined },
    { loading: true, devs: [], pairs: [] },
    { loading: false, devs: undefined, pairs: undefined }
  ].forEach(props => {
    const component = mount(<App {...props} />);
    expect(component).toContainReact(<span>Loading...</span>);
  });
});

it('renders a dev it was given', () => {
  const dev = { name: 'Kevin', color: '#000' };
  const component = mount(
    <App devs={[dev]} pairs={[[]]} />
  );
  expect(component).toIncludeText('Kevin');
});

it('renders a pair it was given', () => {
  const dev = { name: 'Kevin', color: '#000' };
  const component = mount(
    <App devs={[]} pairs={[[dev]]} />
  );
  expect(component).toIncludeText('Kevin');
});

it('resets the store when the reset button is clicked', () => {
  const store = require('../../store');
  const oldReset = store.reset;
  store.reset = jest.fn();

  const component = mount(<App devs={[]} pairs={[[]]} />);
  component.find('button').simulate('click');
  expect(store.reset).toHaveBeenCalled();

  store.reset = oldReset;
});

it('is wrapped in DragDropContext', () => {
  const component = mount(<App />);
  expect(component.name()).toMatch(/DragDropContext/);
});
