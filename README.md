# React Singleton
A React higher-order component that synchronizes state across all instances of its wrapped component

## Getting Started

### How to use Singleton
```
npm install --save-dev https://github.com/peterbee/react-singleton.git
```
:warning: _To avoid confusion: this is not the same as the 'react-singleton' module available via npm_

```
import React from 'react`;
import AsSingleton from '@peterbee/react-singleton`;

class MyStatefulComponent extends React.Component {
  // ... define your stateful component here
}

export default AsSingleton(MyStatefulComponent);
```

:white_check_mark: That's it.  That is the magic of Singleton.  There isn't anything else to learn.  You can write your components the same way you always do –– updating local state to rerender –– and now every instance of that component rerenders.  No more need to trace through complex call stacks and data stores to figure out which action needs to be dispatched or which listeners are subscribed to which channels.  Life can be relaxing and fun again.

(Why do we tend to make life so much harder than it has to be?)

### What Singleton does
Singleton synchronizes local state between all instances of a component, _as if that component were a singleton object._  If any instance updates it state, all other instances will be updated automatically.  This makes it possible to encapsulate data in a component and still have it available throughout your application via your well-planned interface.

## When to use Singleton
I created Singleton because I believe it is a better way to manage shared data —- without using the provider pattern or exposing state in a global store.  So anywhere you are using Redux or Broadcast, you can probably simplify your life with Singleton.

I work on an application that has a dozen teams working on it across dozens of repositories.  Each team manages different pages of the application and we all write shared components for others teams to use on their pages.  Provider and broadcast patterns couple the composition of individual components to the full application; this is a major hurdle (full of frustration, lost time, and wasted money) every time a team wants to alter how it manages its data.  With a shared global Redux store, teams also have the ability to piggy-back on top of Redux actions, even though those actions are likely to change at any time in the future.

### Singleton to the rescue
Enter Singleton: the encapsulated, simple, readable way to provide shared information across a multitude of components.

For example, we can use it to manage the logged-in user account in an application.  Many parts of the app need to know if a user is logged in, who that user is, and what preferences they have configured.  Any component throughout the app can import a higher-order component called `WithAccount` that passes a prop called `account` to its child component:
```
WithAccount(Header)
WithAccount(Dashboard)
WithAccount(Preferences)
```
The `account` prop provides an interface to get/set user info, attempt logins, etc.  The header of the app has the user's name in it, the dashboard page displays various things that the user has saved, and the preferences page allows the user to update their preferences.  Each of these components (header, dashboard, and preferences) is wrapped in the `WithAccount` HOC so that it has access to the account info it needs.

```
<Page>
  <Header/>
  <Dashboard/>
  <Preferences/>
</Page>
```

But what happens when the user updates preferences that should change the way the dashboard behaves?  The dashboard won't know about the change occuring in the preferences part of the component tree, so we use Singleton to save the day.  Singleton synchronizes the state across all instance of the `WithAccount` HOC, meaning that all other components get account updates instantly!
```
// Create the singleton component once
const WithAccountSingleton = AsSingleton(WithAccount);

// The states of these WithAccount components will always be synchronized
WithAccountSingleton(Header)
WithAccountSingleton(Dashboard)
WithAccountSingleton(Preferences)

// Worth noting: the local states of Header, Dashboard, and Preferences are untouched; only WithAccount state is synchronized
```

## Multiple Singletons
Is "multiple singletons" an oxymoron?  Maybe, but I'll allow it.

The Singleton component can be used multiple times, to wrap different components or even the same one!
```
// Creating multiple singletons is okay!
export default {
  WithAccount: AsSingleton(WithAccount), // state synced across WithAccount instances
  WithShoppingCart: AsSingleton(WithItemList) // state synced across WithShoppingCart instances
  WithGiftRegistry: AsSingleton(WithItemList) // state synced across WithGiftRegistry instances
}
```

## Questions & Issues

[Please ask questions and report problems in Github](https://github.com/peterbee/react-singleton/issues) so I can help and so we can make Singleton better!
