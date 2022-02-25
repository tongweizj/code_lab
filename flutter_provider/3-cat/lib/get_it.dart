import 'package:cat/provider/cat_provider.dart';
import 'package:get_it/get_it.dart';

final getIt = GetIt.instance;

/// 类似，我现在用的也在同样的位置，把所有要用的provider对象全部起一次
void setup() {
  getIt.registerSingleton<CatProvider>(CatProvider());
}
