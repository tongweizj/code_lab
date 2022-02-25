import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:providerdemo/core/models/post.dart';
import 'package:providerdemo/core/models/user.dart';
import 'package:providerdemo/ui/shared/app_colors.dart';
import 'package:providerdemo/ui/shared/text_styles.dart';
import 'package:providerdemo/ui/shared/ui_helpers.dart';
import 'package:providerdemo/ui/widgets/comments.dart';

class PostView extends StatelessWidget {
  final Post post;
  const PostView({Key key, this.post}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backgroundColor,
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            UIHelper.verticalSpaceLarge,
            Text(post.title, style: headerStyle),
            Text(
              'by ${Provider.of<User>(context).name}',
              style: TextStyle(fontSize: 9.0),
            ),
            UIHelper.verticalSpaceMedium,
            Text(post.body),
            Comments(post.id)
          ],
        ),
      ),
    );
  }
}
