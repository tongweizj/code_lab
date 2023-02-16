# geolocator

## [geolocator](https://pub.dev/packages/geolocator)

## Features

- Get the last known location;
- Get the current location of the device;
- Get continuous location updates;
- Check if location services are enabled on the device;
- Calculate the distance (in meters) between two geocoordinates;


- Calculate the bearing between two geocoordinates;

## Example 

The code below shows an example on how to acquire the current position of the device, including checking if the location services are enabled and checking / requesting permission to access the position of the device:

```dart
import 'package:geolocator/geolocator.dart';

/// Determine the current position of the device.
///
/// When the location services are not enabled or permissions
/// are denied the `Future` will return an error.
Future<Position> _determinePosition() async {
  bool serviceEnabled;
  LocationPermission permission;

  // Test if location services are enabled.
  serviceEnabled = await Geolocator.isLocationServiceEnabled();
  if (!serviceEnabled) {
    // Location services are not enabled don't continue
    // accessing the position and request users of the 
    // App to enable the location services.
    return Future.error('Location services are disabled.');
  }

  permission = await Geolocator.checkPermission();
  if (permission == LocationPermission.denied) {
    permission = await Geolocator.requestPermission();
    if (permission == LocationPermission.denied) {
      // Permissions are denied, next time you could try
      // requesting permissions again (this is also where
      // Android's shouldShowRequestPermissionRationale 
      // returned true. According to Android guidelines
      // your App should show an explanatory UI now.
      return Future.error('Location permissions are denied');
    }
  }
  
  if (permission == LocationPermission.deniedForever) {
    // Permissions are denied forever, handle appropriately. 
    return Future.error(
      'Location permissions are permanently denied, we cannot request permissions.');
  } 

  // When we reach here, permissions are granted and we can
  // continue accessing the position of the device.
  return await Geolocator.getCurrentPosition();
}

```

### API 

#### Geolocation

To query the current location of the device simply make a call to the getCurrentPosition method. You can finetune the results by specifying the following parameters:
要查询设备的当前位置，只需调用getCurrentPosition方法。你可以通过指定以下参数对结果进行微调。

- desiredAccuracy预期精度
  the accuracy of the location data that your app wants to receive;
  你的应用程序想要接收的位置数据的准确性。
- timeLimit时间限制
  the maximum amount of time allowed to acquire the current location. When the time limit is passed a TimeOutException will be thrown and the call will be cancelled. By default no limit is configured.
    允许获取当前位置的最大时间量。当超过时间限制时，将抛出一个TimeOutException，并且调用将被取消。默认情况下，没有配置任何限制。

```dart
import 'package:geolocator/geolocator.dart';

Position position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
```

To query the last known location retrieved stored on the device you can use the getLastKnownPosition method (note that this can result in a null value when no location details are available):

```dart
import 'package:geolocator/geolocator.dart';

Position position = await Geolocator.getLastKnownPosition();
```

To listen for location changes you can call the getPositionStream to receive stream you can listen to and receive position updates. You can finetune the results by specifying the following parameters:

desiredAccuracy: the accuracy of the location data that your app wants to receive;
distanceFilter: the minimum distance (measured in meters) a device must move horizontally before an update event is generated;
timeInterval: (Android only) the minimum amount of time that needs to pass before an update event is generated;
timeLimit: the maximum amount of time allowed between location updates. When the time limit is passed a TimeOutException will be thrown and the stream will be cancelled. By default no limit is configured.
import 'package:geolocator/geolocator.dart';

StreamSubscription<Position> positionStream = Geolocator.getPositionStream(locationOptions).listen(
    (Position position) {
        print(position == null ? 'Unknown' : position.latitude.toString() + ', ' + position.longitude.toString());
    });
To listen for service status changes you can call the getServiceStatusStream. This will return a Stream<ServiceStatus> which can be listened to, to receive location service status updates.

import 'package:geolocator/geolocator.dart';

StreamSubscription<ServiceStatus> serviceStatusStream = Geolocator.getServiceStatusStream().listen(
    (ServiceStatus status) {
        print(status);
    });
Get location accuracy (Android and iOS 14+ only) To query if a user enabled Approximate location fetching or Precise location fetching, you can call the Geolocator().getLocationAccuracy() method. This will return a Future<LocationAccuracyStatus>, which when completed contains a LocationAccuracyStatus.reduced if the user has enabled Approximate location fetching or LocationAccuracyStatus.precise if the user has enabled Precise location fetching. When calling getLocationAccuracy before the user has given permission, the method will return LocationAccuracyStatus.reduced by default. On iOS 13 or below, the method getLocationAccuracy will always return LocationAccuracyStatus.precise, since that is the default value for iOS 13 and below.

import 'package:geolocator/geolocator.dart';

var accuracy = await Geolocator.getLocationAccuracy();
To check if location services are enabled you can call the isLocationServiceEnabled method:

import 'package:geolocator/geolocator.dart';

bool isLocationServiceEnabled  = await Geolocator.isLocationServiceEnabled();
Permissions 
The geolocator will automatically try to request permissions when you try to acquire a location through the getCurrentPosition or getPositionStream methods. We do however provide methods that will allow you to manually handle requesting permissions.

If you want to check if the user already granted permissions to acquire the device's location you can make a call to the checkPermission method:

import 'package:geolocator/geolocator.dart';

LocationPermission permission = await Geolocator.checkPermission();
If you want to request permission to access the device's location you can call the requestPermission method:

import 'package:geolocator/geolocator.dart';

LocationPermission permission = await Geolocator.requestPermission();
Possible results from the checkPermission and requestPermission methods are:

Permission	Description
denied	Permission to access the device's location is denied by the user. You are free to request permission again (this is also the initial permission state).
deniedForever	Permission to access the device's location is permenantly denied. When requesting permissions the permission dialog will not been shown until the user updates the permission in the App settings.
whileInUse	Permission to access the device's location is allowed only while the App is in use.
always	Permission to access the device's location is allowed even when the App is running in the background.
Note: Android can only return whileInUser, always or denied when checking permissions. Due to limitations on the Android OS it is not possible to determine if permissions are denied permanently when checking permissions. Using a workaround the geolocator is only able to do so as a result of the requestPermission method. More information can be found in our wiki.

Settings 
In some cases it is necessary to ask the user and update their device settings. For example when the user initially permanently denied permissions to access the device's location or if the location services are not enabled (and, on Android, automatic resolution didn't work). In these cases you can use the openAppSettings or openLocationSettings methods to immediately redirect the user to the device's settings page.

On Android the openAppSettings method will redirect the user to the App specific settings where the user can update necessary permissions. The openLocationSettings method will redirect the user to the location settings where the user can enable/ disable the location services.

On iOS we are not allowed to open specific setting pages so both methods will redirect the user to the Settings App from where the user can navigate to the correct settings category to update permissions or enable/ disable the location services.

import 'package:geolocator/geolocator.dart';

await Geolocator.openAppSettings();
await Geolocator.openLocationSettings();