# React Singleton

A React hook that synchronizes state across all instances of a component

:warning: Major update to `v1.0` — Singleton now uses React Hooks instead of a higher-order component

## Getting Started

### How to use Singleton

```
npm install --save-dev https://github.com/peterbee/react-singleton.git
```

:warning: _To avoid confusion: this is not the same as the 'react-singleton' module available via npm_

```
import createSingleton from '@peterbee/react-singleton`;

const [useMyData, updateMyData] = createSingleton('initial value');

function MyComponent() {
  const myData = useMyData();

  return myData;
}
```

:white_check_mark: That's it. That is the magic of a singleton. There isn't anything else to learn. Whenever you call `updateMyData` every component that uses the hook rerenders with the updated value. No more need to trace through complex call stacks and data stores to figure out which action needs to be dispatched or which listeners are subscribed to which channels. Life can be relaxing and fun again.

(Why do we tend to make life so much harder than it has to be?)

Since Singleton uses React Hooks, it can only be used in function components.  But it is easy to add it to class components too:

```
import createSingleton from '@peterbee/react-singleton`;

const [useMyData, updateMyData] = createSingleton('initial value');


class MyComponent extends Component {
  render() {
    return this.props.myData;
  }
}

export default props => <MyComponent {...props} myData={useMyData()} />;

```


### What Singleton does

Singleton synchronizes state between all instances of a component, _as if that component were a singleton object._ If any instance updates it state, all other instances will be updated automatically. This makes it possible to encapsulate data in a component and still have it available throughout your application via your well-planned interface.

## When to use Singleton

I created Singleton because I believe it is a better way to manage shared data —- without using the provider pattern or exposing state in a global store. So anywhere you are using Redux or Broadcast, you can simplify your life with Singleton.

I work on an application that has a dozen teams working on it across dozens of repositories. Each team manages different pages of the application and we all write shared components for others teams to use on their pages. Provider and broadcast patterns couple the composition of individual components to the full application; this is a major hurdle (full of frustration, lost time, and wasted money) every time a team wants to alter how it manages its data. With a shared global Redux store, teams also have the ability to piggy-back on top of Redux actions, even though those actions can change at any time in the future (and they will change, of course, at the least opportune time).

(Is there every an opportune time?)

### Singleton to the rescue

Enter Singleton: the encapsulated, simple, readable way to provide shared information across a multitude of components.

For example, we can use it to manage the logged-in user account in an application. Many parts of the app need to know if a user is logged in, who that user is, and what preferences they have configured. Any component throughout the app can import a singleton state hook.

Create the hook in a file that owns account data:

```
// useAccount.js
import createSingleton from '@peterbee/react-singleton`;

const [useAccount, updateAccount] = createSingleton(accountObject);

export default useAccount;
```

Use the hook in any component that needs account data:

```
import useAccount from './useAccount';

function Profile() {
  const account = useAccount();

  return (
    <div>Hello {account.first_name}!</div>
  );
}

export default Profile;
```

## Questions & Issues

[Please ask questions and report problems in Github](https://github.com/peterbee/react-singleton/issues) so I can help and so we can make Singleton better!
