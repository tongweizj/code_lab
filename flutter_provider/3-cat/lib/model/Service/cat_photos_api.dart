import 'package:dartz/dartz.dart';
import 'package:http/http.dart' as http;

class CatPhotoApi {
  String endpoint = "api.thecatapi.com";
  Future<Either<Exception, String>> getRandomCatPhoto() async {
    try {
      final queryParameters = {
        "api_key": "7538460c-4e20-4b39-b138-cc125970a149",
      };
      final uri = Uri.https(endpoint, "/v1/images/search", queryParameters);
      final response = await http.get(uri);
      return Right(response.body);
    } on Exception catch (e) {
      return (Left(e));
    }
  }
}
