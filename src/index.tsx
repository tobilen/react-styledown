import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

function checksum(s: string) {
  var hash = 0,
    strlen = s.length,
    i,
    c;
  if (strlen === 0) {
    return hash.toString();
  }
  for (i = 0; i < strlen; i++) {
    c = s.charCodeAt(i);
    hash = (hash << 5) - hash + c;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
}

export const useStyles = (input: string) => {
  const [className, setClassName] = React.useState<string>();
  React.useEffect(() => {
    // create styled component with passed styles
    const StyleContainer = styled.div`
      ${input}
    `;

    const inputChecksum = checksum(input);

    // create (invisible) portal and render component there to attach styles
    const orphanContainer = document.createElement('div');
    ReactDOM.render(
      <StyleContainer id={inputChecksum} />,
      orphanContainer,
      () => {
        setClassName(
          orphanContainer.querySelector(`#${inputChecksum}`)?.className,
        );
      },
    );

    return () => {
      ReactDOM.unmountComponentAtNode(orphanContainer);
    };
  }, [input]);

  return { className };
};
