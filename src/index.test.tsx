import * as React from 'react';
import '@invisionag/jest-styled-components';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { useStyles } from '.';

const StaticallyStyledComponent: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = (props) => {
  const { className } = useStyles()`
    background-color: red
  `;
  return (
    <div {...props} data-testid="target-component" className={className}>
      classname is {className}
      {props.children}
    </div>
  );
};

const RuntimeStyledComponent: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { color: 'blue' | 'green' }
> = (props) => {
  const { className } = useStyles<{ color: 'blue' | 'green' }>(props)`
    background-color: ${(props) => props.color};
  `;
  return (
    <div {...props} data-testid="target-component" className={className}>
      classname is {className}
      {props.children}
    </div>
  );
};

describe('react-styledown', () => {
  it('attaches static styles to the dom', () => {
    render(<StaticallyStyledComponent />);

    const myComponent = screen.getByText(/classname is.*/);

    expect(myComponent).toBeInTheDocument();
    expect(myComponent).toHaveStyleRule('background-color: red');
  });

  it('attaches runtime styles to the dom', () => {
    const { rerender } = render(<RuntimeStyledComponent color="blue" />);

    const myComponent = screen.getByText(/classname is.*/);

    expect(myComponent).toHaveStyleRule('background-color: blue');
    rerender(<RuntimeStyledComponent color="green" />);
    expect(myComponent).toHaveStyleRule('background-color: green');
  });
});
