import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:providerdemo/core/constants/app_contstants.dart';
import 'package:providerdemo/core/models/post.dart';
import 'package:providerdemo/ui/views/home_view.dart';
import 'package:providerdemo/ui/views/login_view.dart';
import 'package:providerdemo/ui/views/post_view.dart';

class RRouter {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case RoutePaths.Home:
        return MaterialPageRoute(builder: (_) => HomeView());
      case RoutePaths.Login:
        return MaterialPageRoute(builder: (_) => LoginView());
      case RoutePaths.Post:
        var post = settings.arguments as Post;
        return MaterialPageRoute(builder: (_) => PostView(post: post));
      default:
        return MaterialPageRoute(
            builder: (_) => Scaffold(
                  body: Center(
                    child: Text('No route defined for ${settings.name}'),
                  ),
                ));
    }
  }
}
