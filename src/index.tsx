import * as React from 'react';
import ReactDOM from 'react-dom';
import styled, {
  CSSObject,
  InterpolationFunction,
  Interpolation,
} from 'styled-components';

export function useStyles<T = {}>(
  props?: React.HTMLAttributes<HTMLDivElement> & T,
) {
  return (
    literal: TemplateStringsArray | CSSObject | InterpolationFunction<any>,
    ...expressions: TemplateStringsArray | CSSObject[] | Interpolation<any>[]
  ) => {
    const [className, setClassName] = React.useState<string>();

    React.useEffect(() => {
      // create styled component with passed styles
      const StyleContainer = styled.div(literal, ...expressions);

      // create (invisible) portal and render component there to attach styles
      const orphanContainer = document.createElement('div');
      ReactDOM.render(<StyleContainer {...props} />, orphanContainer, () => {
        const generatedClassName = orphanContainer.children[0]?.className;
        setClassName(
          props?.className
            ? `${props?.className} ${generatedClassName}`
            : generatedClassName,
        );
      });

      return () => {
        ReactDOM.unmountComponentAtNode(orphanContainer);
      };
    }, [literal]);

    return { className };
  };
}

export default useStyles;
