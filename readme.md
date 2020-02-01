[![tobilen](https://circleci.com/gh/tobilen/react-styledown.svg?style=svg)](https://app.circleci.com/github/tobilen/react-styledown/pipelines~~~~)

# react-styledown

react-styledown helps you with styling components through styled components that are not necessarily made for it, such as:

- Components that can receive classnames for their inner components
- Are not react-based

It does not use any internal interface and should be compatible with all versions of styled components from 3.0.0 upwards.

# Examples

StyleDown expects a react component in it's `children` prop. You can either pass your component directly or via inline function to reassign the `className` prop to where you want it to go.

### Simple Usage

```tsx
import styledown from 'react-styledown';

const StyleDown = styledown`
  background-color: red;
`;

const TargetComponent = (props: HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>Hello World</div>
);

export const MyComponent = () => <StyleDown>{TargetComponent}</StyleDown>;
```

### Advanced Usage

```tsx
import styledown from 'react-styledown';
import SomeComplicatedComponent from 'very-clever-component';

const StyleDown = styledown`
  background-color: red;
`;

export const MyComponent = () => (
  <StyleDown>
    {({ className }) => (
      <SomeComplicatedComponent innerElementProps={{ className }} />
    )}
  </StyleDown>
);
```

### Use Component directly

If for whatever reason you prefer to call styled-components in your own code, you can instead import the base component yourself. This may be useful if you're not using the styled-components version that `react-styledown` depends on, or some other CSS-in-JS solution alltogether.

```tsx
import customStyled from 'my-styled-components-fork';
import { StyleDown as UnstyledStyleDown } from 'react-styledown';
import SomeComplicatedComponent from 'very-clever-component';

const StyleDown = customStyled(UnstyledStyleDown)`
  background-color: red;
`;

const TargetComponent = (props: HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>Hello World</div>
);

export const MyComponent = () => <StyleDown>{TargetComponent}</StyleDown>;
```

# Editor Support

#### vscode

To enable editor support in vscode, you can install the officially supported plugin: https://github.com/Microsoft/typescript-styled-plugin

It can be configured to support additional tags; Simply add the `styledown` tag as described here: https://github.com/Microsoft/typescript-styled-plugin#tags

#### Webstorm

JetBrain's Webstorm editor ships natively with syntax highlighting support for styled-components. To enable syntax highlighting for react-styledown's keyword `styledown`, simply add it as described in their readme: https://github.com/styled-components/webstorm-styled-components#configuration

#### Vim

The vim plugin currently offers no way of configuring additional keywords. However, you can still fork the plugin and extend the relevant lines ( https://github.com/styled-components/vim-styled-components/blob/main/after/syntax/javascript.vim#L99 )
