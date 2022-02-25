```dart
Future<void> _postRequest() async {
    ...
    await RequestUtil().post(path, data: data)
        .then(_handleDioResponse)
        .catchError(_handleDioError);
}

void _handleDioResponse(dynamic response){
    ...
}

void _handleDioError(dynamic error){
    ...
}
```

