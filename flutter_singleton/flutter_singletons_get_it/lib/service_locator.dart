import 'package:flutter_singletons/singleton_model.dart';
import 'package:get_it/get_it.dart';

final GetIt getIt = GetIt.instance;
void setup() {
  getIt.registerLazySingleton(() => SingletonModel());
}
