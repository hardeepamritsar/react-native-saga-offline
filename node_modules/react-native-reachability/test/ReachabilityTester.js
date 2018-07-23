import { Platform, NativeModules } from 'react-native';

const { NativeReachability } = NativeModules;

export const isReachable = async (timeout?: Number) => {
  timeout = timeout ? timeout : 5000;

  return new Promise((resolve, reject) => {
    NativeReachability.isReachable(timeout)
      .then(result => {
        if (Platform.OS === 'ios') {
          resolve(result === 1 ? true : false);
        } else {
          resolve(result);
        }
      })
      .catch(error => {
        reject(error);
      });
  })
}
