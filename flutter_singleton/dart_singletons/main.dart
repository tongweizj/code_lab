import './thing.dart';

main() {
  print('#1');
  var thing = Thing();
  print(thing.name);
  print('#2');
  thing.foo('Max');
  print(thing.name);
  print('#3');
  Thing two = Thing();
  print(two.name);
}
