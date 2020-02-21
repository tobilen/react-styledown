import * as React from 'react';
import styled from 'styled-components';

export type RenderFunctionProps = React.HTMLAttributes<HTMLDivElement>;

export type Props = RenderFunctionProps & {
  children: React.ComponentType<RenderFunctionProps>;
};

export const StyleDown: React.FC<Props> = ({
  children: Component,
  ...props
}) => <Component {...props} />;

export const styledown = styled(StyleDown);

export default styledown;
