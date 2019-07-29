import Network from 'react-native-internet-reachability';
import { networkRreachable, networkUnRreachable } from './actionCreators';

export default class Connectivity {
  constructor(store, timeout, domain) {
    this.store = store;
    this.reachabilityTimeout = timeout ? timeout : 5000;
    this.reachabilityDomain = domain ? domain : '8.8.8.8';
    this.previousConnectionState = null;
    setInterval(this.handleConnectivityChange.bind(this), 10000);
  }

  updateAvailability(isConnected) {
    if (this.previousConnectionState !== isConnected) {
      if (isConnected) {
        this.store.dispatch(networkRreachable());
      } else {
        this.store.dispatch(networkUnRreachable());
      }
    }
    this.previousConnectionState = isConnected;
  }

  async handleConnectivityChange() {
    this.updateAvailability(await Network.isReachable(this.reachabilityTimeout, this.reachabilityDomain));
  }

  static async isConnected() {
    return Network.isReachable(this.reachabilityTimeout, this.reachabilityDomain);
  }
}
