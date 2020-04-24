import * as React from 'react';
import '@invisionag/jest-styled-components';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import { useStyles } from '.';

const TargetComponent: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  const { className } = useStyles('background-color: red');
  return (
    <div {...props} data-testid="target-component" className={className}>
      classname is {className}
      {props.children}
    </div>
  );
};

describe('react-styledown', () => {
  it('attaches styles to the dom', async () => {
    const { unmount, container, debug } = render(<TargetComponent />);

    const myComponent = screen.getByText(/classname is.*/);

    expect(myComponent).toBeInTheDocument();
    expect(myComponent).toHaveStyleRule('background-color: red');
  });
});
