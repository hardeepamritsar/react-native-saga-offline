
<p align="center"><a href="https://travis-ci.org/hardeepamritsar/react-native-saga-offline"><img src="https://travis-ci.org/hardeepamritsar/react-native-saga-offline.svg?branch=master"/></a></p>

# react-native-saga-offline
Adds saga actions to offline queue if network is not reachable, dispatch offline actions once network becomes reachable 


## Installation

```
npm install --save react-native-saga-offline # with npm
yarn add react-native-saga-offline # with yarn
```

Link react-native-internet-reachability
```
react-native link react-native-internet-reachability
```

## How it works

<p align="center"><a href="https://i.imgur.com/F3jY0zM.png"><img src="https://i.imgur.com/F3jY0zM.png"/></a></p>


## How to use
```javascript

import createSagaOfflineMiddleware, { Connectivity } from 'react-native-saga-offline';


const sagaOffline = createSagaOfflineMiddleware();
this.store = this.createStore(
      persistedRootReducer,
      applyMiddleware(sagaOffline) // make sure sagaOffline is first middleware to be added
    );
    
new Connectivity(this.store);


```

Add reducer

```javascript

import { offlineReducer } from 'react-native-saga-offline';


const appReducer = combineReducers({
  offline: offlineReducer,
});
```

Action with meta.retry : true would be queued as offline action
```javascript

export const sagaAction = () => ({
  type: sagaActionsTypes.actionType,
  meta: {
    retry: true,
  },
});
```

Action from offline queue with have meta.actionFromOfflineQueue as true
