import * as React from 'react';
import ReactDOM from 'react-dom';
import styled, { CSSObject, InterpolationFunction } from 'styled-components';
import { generateAlphabeticName, hash } from './hash';

export function useStyles<T = {}>(
  props?: React.HTMLAttributes<HTMLDivElement> & T,
) {
  return (
    literal: TemplateStringsArray | CSSObject | InterpolationFunction<any>,
    ...expressions:
      | TemplateStringsArray
      | CSSObject[]
      | InterpolationFunction<any>[]
  ) => {
    const [className, setClassName] = React.useState<string>();

    React.useEffect(() => {
      // create styled component with passed styles
      const StyleContainer = styled.div(literal, expressions);

      const className = generateAlphabeticName(hash(literal.toString()));

      // create (invisible) portal and render component there to attach styles
      const orphanContainer = document.createElement('div');
      ReactDOM.render(
        <StyleContainer {...props} className={className} />,
        orphanContainer,
        () => {
          setClassName(
            orphanContainer.querySelector(`.${className}`)?.className,
          );
        },
      );

      return () => {
        ReactDOM.unmountComponentAtNode(orphanContainer);
      };
    }, [literal]);

    return { className };
  };
}

export default useStyles;
