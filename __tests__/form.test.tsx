import {expect, test} from '@jest/globals';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../components/Form';
import {apiCall} from '../resources/functions';

// Mock the function in ../resources/functions
jest.mock('../resources/functions');


test('text input initially empty', () => {
  render(
    <Form
      setQueryResult={() => {}}
      apiCall={apiCall}
    />
  );

  const textBox = screen.getByRole<HTMLInputElement>('textbox');

  expect(textBox).toBeDefined();
  expect(textBox.value).toBe('');
});

test('text input value reflects key input', () => {
  userEvent.setup();

  render(
    <Form
      setQueryResult={() => {}}
      apiCall={apiCall}
    />
  );

  const textBox = screen.getByRole<HTMLInputElement>('textbox');
  fireEvent.change(textBox, {target: {value: 'www.example.com'}});

  expect(textBox.value).toBe('www.example.com');
});

// Api call here is mocked.
test('submitting valid form clears text input', () => {

  userEvent.setup();

  render(
    <Form
      setQueryResult={() => {}}
      apiCall={apiCall}
    />
  );

  const textBox = screen.getByRole<HTMLInputElement>('textbox');
  const submitBtn = screen.getByRole<HTMLButtonElement>('button');
  fireEvent.change(textBox, {target: {value: 'www.example.com'}});
  userEvent.click(submitBtn);

  expect(textBox.value).toBe('');
})