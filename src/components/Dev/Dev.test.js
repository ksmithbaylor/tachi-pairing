import React from 'react';
import { render } from 'react-dom';

import Dev, { Dev as RawDev } from '.';

it('renders without blowing up on zero props', () => {
  const div = document.createElement('div');
  render(<RawDev />, div);
});

it('has the right styles when not dragging', () => {
  const component = shallow(
    <RawDev dev={{ name: 'Kevin', color: '#0a0'}} />
  );

  expect(component).toHaveStyle('backgroundColor', '#0a0');
  expect(component).toHaveStyle('outline', '2px solid #555');
  expect(component).toHaveStyle('opacity', 'initial');
});

it('has the right styles when dragging', () => {
  const component = shallow(
    <RawDev dev={{ name: 'Kevin', color: '#0a0'}} isDragging />
  );

  expect(component).toHaveStyle('backgroundColor', '#0a0');
  expect(component).toHaveStyle('outline', '2px dotted #333');
  expect(component).toHaveStyle('opacity', '0.4');
});

it('displays the name of the dev', () => {
  const component = shallow(
    <RawDev dev={{ name: 'Kevin', color: '#0a0' }} />
  );

  expect(component).toIncludeText('Kevin');
});

it('has the correct default name and color', () => {
  const component = shallow(<RawDev />);

  expect(component).toHaveStyle('backgroundColor', '#fff');
  expect(component).toIncludeText('[Name]');
});
