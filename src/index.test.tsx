import * as React from 'react';
import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect';
import styled from 'styled-components';
import { render } from '@testing-library/react';
import { StyleDown as UnstyledStyleDown } from '.';

describe('StyleDown', () => {
  const TargetComponent = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} data-testid="target-component">
      classname is {props.className}
    </div>
  );

  const ComplicatedTargetComponent = ({
    passedClassName,
    ...props
  }: React.HTMLAttributes<HTMLDivElement> & { passedClassName?: string }) => (
    <div {...props} data-testid="target-component">
      <div className={passedClassName} data-testid="inner-target-component">
        <span>classname is {props.className}</span>
        <span>inner classname is {passedClassName}</span>
      </div>
    </div>
  );

  it('works when not wrapping the StyleDown component in styled', () => {
    const { getByText } = render(
      <UnstyledStyleDown>{TargetComponent}</UnstyledStyleDown>,
    );

    expect(getByText('classname is')).toBeInTheDocument();
  });

  it('passes stuff through to child component', () => {
    const { getByText } = render(
      <UnstyledStyleDown className="custom class name">
        {TargetComponent}
      </UnstyledStyleDown>,
    );

    expect(getByText('classname is custom class name')).toBeInTheDocument();
  });

  it('passes on the styled-components class', () => {
    const StyleDown = styled(UnstyledStyleDown)`
      background-color: red;
    `;

    const { getByTestId } = render(<StyleDown>{TargetComponent}</StyleDown>);

    expect(getByTestId('target-component')).toHaveStyleRule(
      'background-color',
      'red',
    );
  });

  it('makes the classname usable inside the passed component', () => {
    const StyleDown = styled(UnstyledStyleDown)`
      background-color: red;
    `;

    const { getByText } = render(<StyleDown>{TargetComponent}</StyleDown>);

    expect(getByText(/classname.is..+/)).toBeInTheDocument();
  });

  it('allows for inline implementations to control classname', () => {
    const StyleDown = styled(UnstyledStyleDown)`
      background-color: red;
    `;

    const { getByTestId } = render(
      <StyleDown>
        {({ className }) => (
          <ComplicatedTargetComponent passedClassName={className} />
        )}
      </StyleDown>,
    );

    expect(getByTestId('target-component')).not.toHaveStyleRule(
      'background-color',
    );

    expect(getByTestId('inner-target-component')).toHaveStyleRule(
      'background-color',
      'red',
    );
  });
});
