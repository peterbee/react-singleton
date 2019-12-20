import React from 'react';
import { storiesOf } from '@storybook/react';

import createSingleton from '../';

const [useCount, updateCount] = createSingleton(0);
const [useToggle, updateToggle] = createSingleton(false);

function SampleComponent(props) {
  const count = useCount();
  const toggle = useToggle();

  const increment = () => updateCount(prevState => prevState + 1);
  const flipToggle = () => updateToggle(prevState => !prevState);

  return (
    <div style={{ border: '1px solid gray', margin: 15, padding: 15 }}>
      <p>Component {props.id + 1}</p>
      <p>Count: {count}</p>
      <p>Logged In: {toggle + ''}</p>
      <p>
        <button onClick={increment}>increment</button>
        <button onClick={flipToggle}>toggle</button>
      </p>
    </div>
  );
}

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      components: []
    };
  }
  addComponent = component => () =>
    this.setState(prevState => ({ components: prevState.components.concat(SampleComponent) }));
  removeComponent = component => () =>
    this.setState(prevState => ({ components: prevState.components.slice(1) }));
  renderComponents = () =>
    this.state.components.map((Component, i) => <Component key={i} id={i} />);
  render() {
    return (
      <div>
        <button onClick={this.addComponent()}>new component</button>
        <button onClick={this.removeComponent()}>remove component</button>
        {this.renderComponents()}
      </div>
    );
  }
}

storiesOf('React Singleton', module).add('createSingleton', () => <Container />);
