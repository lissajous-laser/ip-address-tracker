import {expect, test} from '@jest/globals';
import {fireEvent, getByRole, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../components/Form';
import {apiCall} from '../resources/functions';

// Mock the function in ../resources/functions
jest.mock('../resources/functions');

beforeEach(() => {
  render(
    <Form
      setQueryResult={() => {}}
      apiCall={apiCall}
    />
  );
});

test('text input initially empty', () => {
  const textBox = screen.getByRole<HTMLInputElement>('textbox');
  expect(textBox).toBeDefined();
  expect(textBox.value).toBe('');
});

test('text input value reflects key input', () => {
  const textBox = screen.getByRole<HTMLInputElement>('textbox');
  fireEvent.change(textBox, {target: {value: 'www.example.com'}});

  expect(textBox.value).toBe('www.example.com');
});

// Api call here is mocked.
test('submitting filled out form calls api endpoint', () => {
  const textBox = screen.getByRole<HTMLInputElement>('textbox');
  fireEvent.change(textBox, {target: {value: 'www.example.com\n'}});
  fireEvent.submit(screen.getByRole('form'));

  expect(apiCall).toBeCalled();
});

// TODO: fix test. Fails when text input is empty.
test('submitting empty form does not call api endpoint', () => {
  fireEvent.submit(screen.getByRole('form'));

  expect(apiCall).not.toBeCalled();
});