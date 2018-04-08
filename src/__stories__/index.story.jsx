import React from 'react';
import { storiesOf } from '@storybook/react';

import AsSingleton from '../Singleton';

class SampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      loggedIn: false,
      // storing a function in state becomes a problem when this function is passed between instances
      testFunction: () => JSON.stringify(this.state)
    };
  }
  toggle = () =>
    this.setState(
      prevState => ({ loggedIn: !prevState.loggedIn }),
      () => console.log('callback state', this.state)
    );
  increment = () => this.setState(prevState => ({ count: prevState.count + 1 }));
  componentDidMount() {
    console.log('componentDidMount');
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  render() {
    return (
      <div>
        {this.props.id}
        <button onClick={this.increment}>increment</button>
        <button onClick={this.toggle}>toggle</button>
        {JSON.stringify(this.state)}
      </div>
    );
  }
}

const SingletonComponent1 = AsSingleton(SampleComponent);
const SingletonComponent2 = AsSingleton(SampleComponent);

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      components: []
    };
  }
  addComponent = component => () =>
    this.setState(prevState => ({ components: prevState.components.concat(component) }));
  removeComponent = component => () =>
    this.setState(prevState => ({ components: prevState.components.slice(1) }));
  renderComponents = () => this.state.components.map((Component, i) => <Component key={i} id={i} />);
  render() {
    return (
      <div>
        <button onClick={this.addComponent(SingletonComponent1)}>new SingletonComponent1</button>
        <button onClick={this.addComponent(SingletonComponent2)}>new SingletonComponent2</button>
        <button onClick={this.removeComponent()}>-1</button>
        {this.renderComponents()}
      </div>
    );
  }
}

storiesOf('Singleton', module).add('AsSingleton', () => <Container />);
