import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import App from './App';
import Game from './components/Game'

test(`renders Conway's Game of Life <h1>`, () => {
  render(<App />);
  const headerElement = screen.getByText(/Conway's Game of Life/i);
  expect(headerElement).toBeInTheDocument();
});

describe('<App />', () => {
  it('renders Game component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Game />)).toEqual(true);
  });
});
