import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { generateAlphabeticName, hash } from './hash';

export const useStyles = (input: string) => {
  const [className, setClassName] = React.useState<string>();
  React.useEffect(() => {
    // create styled component with passed styles
    const StyleContainer = styled.div`
      ${input}
    `;

    const className = generateAlphabeticName(hash(input));

    // create (invisible) portal and render component there to attach styles
    const orphanContainer = document.createElement('div');
    ReactDOM.render(
      <StyleContainer className={className} />,
      orphanContainer,
      () => {
        setClassName(orphanContainer.querySelector(`.${className}`)?.className);
      },
    );

    return () => {
      ReactDOM.unmountComponentAtNode(orphanContainer);
    };
  }, [input]);

  return { className };
};
