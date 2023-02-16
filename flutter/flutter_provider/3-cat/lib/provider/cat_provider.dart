import 'dart:async';

import 'package:cat/model/core/cat_photo.dart';
import 'package:cat/model/glitch/glitch.dart';
import 'package:cat/model/helper/cat_photo_helper.dart';
import 'package:dartz/dartz.dart';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';

class CatProvider extends ChangeNotifier {
  final _helper = CatPhotoHelper();
  final _streamController = StreamController<Either<Glitch, CatPhoto>>();
  Stream<Either<Glitch, CatPhoto>> get catPhotoStream {
    return _streamController.stream;
  }

  Future<void> getTwentyRandomPhoto() async {
    for (int i = 0; i < 20; i++) {
      final catHelperResult = await _helper.getRandomCatPhoto();
      _streamController.add(catHelperResult);
    }
  }

  void refreshGird() {
    getTwentyRandomPhoto();
  }
}
