import {expect, test} from '@jest/globals';
import React from "react";
import {render, screen} from '@testing-library/react';
import Stat from "../components/Stat";

test('component is mounted', () => {
  const rendered = render(<Stat name='hello' value='world'/>);
  expect(rendered).toBeDefined();


});

test('key text is displayed', () => {
  render(<Stat name='hello' value='world'/>);
  
  const key = screen.getByText('hello');
  expect(key).toBeDefined();
});

test('key text is displayed', () => {
  render(<Stat name='hello' value='world'/>);
  
  const key = screen.getByText('world');
  expect(key).toBeDefined();
});