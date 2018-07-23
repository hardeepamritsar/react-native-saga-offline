
#import "RNReachability.h"
#import "Reachability.h"

@implementation RNReachability

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(isReachable: (NSInteger *)timeout resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NetworkStatus status = [[Reachability reachabilityWithHostName:@"8.8.8.8"] currentReachabilityStatus];
    resolve(@(status == ReachableViaWiFi || status == ReachableViaWWAN ? true : false));
}

@end
