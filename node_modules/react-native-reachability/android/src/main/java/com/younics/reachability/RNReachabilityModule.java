
package com.younics.reachability;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.net.InetAddress;

public class RNReachabilityModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNReachabilityModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNReachability";
  }

  @ReactMethod
  public void isReachable(int timeout, final Promise promise) {
    try {
      promise.resolve(InetAddress.getByName("8.8.8.8").isReachable(timeout));
    } catch (Exception e){
      promise.reject(e);
    }
  }
}