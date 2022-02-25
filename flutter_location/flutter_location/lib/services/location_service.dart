// import 'dart:async';

// import 'package:flutter_location/models/user_location.dart';
// import 'package:location/location.dart';

// class LocationService {
//   late UserLocation _currentLocation;

//   var location = Location();
//   StreamController<UserLocation> _locationController =
//       StreamController<UserLocation>();

//   Stream<UserLocation> get locationStream => _locationController.stream;

//   LocationService() {
//     // Request permission to use location
//     location.requestPermission().then((granted) {
//       if (granted == true) {
//         // If granted listen to the onLocationChanged stream and emit over our controller
//         location.onLocationChanged.listen((locationData) {
//           if (locationData != null) {
//             _locationController.add(UserLocation(
//               latitude: locationData.latitude ?? 0.0,
//               longitude: locationData.longitude ?? 0.0,
//             ));
//           }
//         });
//       }
//     });
//   }
//   Future<UserLocation> getLocation() async {
//     try {
//       var userLocation = await location.getLocation();
//       _currentLocation = UserLocation(
//         latitude: userLocation.latitude ?? 0.0,
//         longitude: userLocation.longitude ?? 0.0,
//       );
//     } on Exception catch (e) {
//       print('Could not get location: ${e.toString()}');
//     }

//     return _currentLocation;
//   }
// }
