class Singleton {
  constructor(initialState) {
    this.instances = []; // array of registered instances
    this.state = initialState; // set initial state of this singleton
  }

  register(instance) {
    this.instances.push(instance); // add instance to array of registered instances
  }

  deregister(instance) {
    const index = this.instances.indexOf(instance); // find reference to instance
    index !== -1 && this.instances.splice(index, 1); // remove instance from array of registered instances
  }

  syncState(newState) {
    this.state = newState; // keep record of latest state for new instances
    // iterate through all registered instances
    this.instances.forEach(instance => {
      instance._superSetState(newState); // explicitly set instance state
    });
  }
}

export default Component => {
  const { componentDidMount, componentWillUnmount, setState } = Component;
  let singleton;

  class InstanceWrapper extends Component {
    constructor(props) {
      super(props);

      if (!singleton) singleton = new Singleton(this.state); // for the first instance, create a singleton with the component's initial state
      this.state = singleton.state; // for additional instances, apply the current singleton state
      this._superSetState = super.setState;
    }

    // @override
    componentDidMount() {
      singleton.register(this); // register this instance with the singleton
      super.componentDidMount && super.componentDidMount();
    }

    // @override
    componentWillUnmount() {
      singleton.deregister(this); // deregister this instance with the singleton
      super.componentWillUnmount && super.componentWillUnmount();
    }

    // @override
    setState(partialState, callback) {
      // first use React's state management to update instance initiating state change
      super.setState(partialState, () => {
        singleton.syncState(this.state); // then update all instances with the entire resulting state object
        callback && callback(); // NOTE: any callback only gets called in context of triggered instance — is this good/bad/neither?
      });
    }
  }

  return InstanceWrapper;
};
