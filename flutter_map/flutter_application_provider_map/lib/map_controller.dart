import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong/latlong.dart';
import 'package:location/location.dart';
import 'package:provider/provider.dart';
import 'model.dart';

class MapControllerPage extends StatefulWidget {
  static const String route = 'map_controller';

  @override
  MapControllerPageState createState() {
    return MapControllerPageState();
  }
}

class MapControllerPageState extends State<MapControllerPage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  static LatLng london = LatLng(51.5, -0.09);
  static LatLng paris = LatLng(48.8566, 2.3522);
  // MapController mapController;
  double rotation = 0.0;

  @override
  void initState() {
    super.initState();
    // mapController = MapController();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      appBar: AppBar(title: Text('MapController')),
      body: Padding(
        padding: EdgeInsets.all(8.0),
        child: Column(
          children: [
            Padding(
              padding: EdgeInsets.only(top: 8.0, bottom: 8.0),
              child: Row(
                children: <Widget>[
                  MaterialButton(
                    child: Text('London'),
                    onPressed: () {
                      // mapController.move(london, 6.0);
                      context.read<Counter>().changeMapController(london);
                      context.read<Counter>().increment();
                    },
                  ),
                  MaterialButton(
                    child: Text('Paris'),
                    onPressed: () {
                      // mapController.move(paris, 5.0);
                      context.read<Counter>().changeMapController(paris);
                    },
                  ),
                  Count(),
                ],
              ),
            ),
            Flexible(
              child: FlutterMap(
                mapController: context.watch<Counter>().mapController,
                options: MapOptions(
                  center: LatLng(51.5, -0.09),
                  zoom: 5.0,
                  maxZoom: 20.0,
                  minZoom: 2.0,
                ),
                layers: [
                  TileLayerOptions(
                      urlTemplate:
                          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                      subdomains: ['a', 'b', 'c']),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class Count extends StatelessWidget {
  const Count({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Text(

        /// Calls `context.watch` to make [Count] rebuild when [Counter] changes.
        '${context.watch<Counter>().count}',
        key: const Key('counterState'),
        style: Theme.of(context).textTheme.headline4);
  }
}
