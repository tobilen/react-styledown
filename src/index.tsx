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

export const styledown = (strings: TemplateStringsArray, ...args: any) => {
  const StyleHolder = styled(StyleDown)(strings, ...args);

  return ({ children: Component, ...props }: Props) => {
    const [styledClassName, setStyledClassName] = React.useState<string>();
    return (
      <>
        <StyleHolder>
          {({ className }) => {
            setStyledClassName(className);
            return null;
          }}
        </StyleHolder>
        {styledClassName && (
          <Component {...props} className={styledClassName} />
        )}
      </>
    );
  };
};

export default styledown;
