import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Game from './Game'

test(`renders Riafugemu <p>`, () => {
  render(<Game />);
  const paragraphElement = screen.getByText(/Riafugemu/i);
  expect(paragraphElement).toBeInTheDocument();
});

test(`renders RiafGridugemu <div>`, () => {
  render(<Game />);

  const inputElement = screen.getByTestId('game-grid');
  expect(inputElement).toBeInTheDocument();
});

describe('Interval Input', () => {

  test('render interval input', () => {
    render(<Game />);
 
    const inputElement = screen.getByTestId('interval-input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'number');
  });

  test('pass valid number to test interval input fiElementd', () => {
    render(<Game />);
 
    const inputElement = screen.getByTestId('interval-input');
    userEvent.type(inputElement, 100);
 
    expect(screen.getByTestId('interval-input')).toHaveValue(100);
  });
  
});

describe('Game Buttons', () => {
  test('render start/stop button', () => {
    render(<Game />);
 
    const buttonElement = screen.getByTestId('start-button');
    expect(buttonElement).toBeInTheDocument();
  });

  test('start/stop button click', () => {
    render(<Game />);
 
    const buttonElement = screen.getByTestId('start-button');
    userEvent.click(buttonElement);
  });

  test('render random button', () => {
    render(<Game />);
 
    const buttonElement = screen.getByTestId('random-button');
    expect(buttonElement).toBeInTheDocument();
  });

  test('random button click', () => {
    render(<Game />);
 
    const buttonElement = screen.getByTestId('random-button');
    userEvent.click(buttonElement);
  });

  test('render clear button', () => {
    render(<Game />);
 
    const buttonElement = screen.getByTestId('clear-button');
    expect(buttonElement).toBeInTheDocument();
  });

  test('clear button click', () => {
    render(<Game />);
 
    const buttonElement = screen.getByTestId('clear-button');
    userEvent.click(buttonElement);
  });
});