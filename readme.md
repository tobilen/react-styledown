# react-styledown

react-styledown helps you with styling components through styled components that are not necessarily made for it, such as:

- Components that can receive classnames for their inner components
- Are not react-based

It does not use any internal interface and should be compatible with all versions of styled components from 3.0.0 upwards.

# Examples

StyleDown expects a react component in it's `children` prop. You can either pass your component directly or via inline function to reassign the `className` prop to where you want it to go.

### Simple Usage

```tsx
import { StyleDown as UnstyledStyleDown } from 'react-styledown';

const StyleDown = styled(UnstyledStyleDown)`
  background-color: red;
`;

const TargetComponent = (props: HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>Hello World</div>
);

export const MyComponent = () => <StyleDown>{TargetComponent}</StyleDown>;
```

### Advanced Usage

```tsx
import { StyleDown as UnstyledStyleDown } from 'react-styledown';
import SomeComplicatedComponent from 'very-clever-component';

const StyleDown = styled(UnstyledStyleDown)`
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
