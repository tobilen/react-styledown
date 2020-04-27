[![tobilen](https://circleci.com/gh/tobilen/react-styledown.svg?style=svg)](https://app.circleci.com/github/tobilen/react-styledown/pipelines~~~~)

# react-styledown

react-styledown helps you with styling components through styled components that are not necessarily made for it, such as:

- Components that can receive classnames for their inner components
- Are not react-based

It works through a hook based interface that takes your styles and hands you back a generated class name whose styles have already been appended to the DOM.

It does not use any internal interface and should be compatible with all versions of styled components from 3.0.0 upwards.

# Examples

### Simple Usage

```tsx
import { useStyles } from 'react-styledown';

const Component = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className } = useStyles(props)`
    background-color: red;
  `;

  return (
    <div {...props} className={className}>
      Hello World
    </div>
  );
};
```

### Advanced Usage

```tsx
import { useStyles } from 'react-styledown';
import SomeComplicatedComponent from 'very-clever-component';

const Component = (
  props: { color: string } & HTMLAttributes<HTMLDivElement>,
) => {
  const { className } = useStyles(props)`
    background-color: red;
    color: ${(props) => props.color};
  `;

  return (
    <div {...props}>
      <SomeComplicatedComponent innerElementProps={{ className }} />
    </div>
  );
};
```

# Editor Support

#### vscode

To enable editor support in vscode, you can install the officially supported plugin: https://github.com/Microsoft/typescript-styled-plugin

It can be configured to support additional tags; Simply add the `useStyles` tag as described here: https://github.com/Microsoft/typescript-styled-plugin#tags

#### Webstorm

JetBrain's Webstorm editor ships natively with syntax highlighting support for styled-components. To enable syntax highlighting for react-styledown's keyword `useStyles`, simply add it as described in their readme: https://github.com/styled-components/webstorm-styled-components#configuration

#### Vim

The vim plugin currently offers no way of configuring additional keywords. However, you can still fork the plugin and extend the relevant lines ( https://github.com/styled-components/vim-styled-components/blob/main/after/syntax/javascript.vim#L99 )
