import * as React from "react";

export type RenderFunctionProps = React.HTMLAttributes<HTMLDivElement>;

export type Props = RenderFunctionProps & {
  children: React.ComponentType<RenderFunctionProps>;
};

export const StyleDown: React.FC<Props> = ({
  children: Component,
  ...props
}) => <Component {...props} />;
