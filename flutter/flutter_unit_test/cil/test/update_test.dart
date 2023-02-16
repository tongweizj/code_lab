import 'package:cil/update.dart';
import 'package:test/test.dart';

void main() {
  test('测试: update', () async {
    var ver = await getAppVer();
    expect(ver, '1.0.4');
  });
}
