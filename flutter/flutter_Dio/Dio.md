# Dio 封装说明



## 作者信息

[github](https://github.com/yuexunshi/flutter_demo)

## Dio 是什么？

[dio](https://pub.dartlang.org/packages/dio)是一个强大的Dart Http请求库，支持Restful API、FormData、拦截器、请求取消、Cookie管理、文件上传/下载、超时、自定义适配器等..

## 基本使用

### 添加依赖

```
dependencies:
  dio: ^3.x.x  // 请使用pub上3.0.0分支的最新版本
```

### 发起一个 GET 请求 :

```
Response response;
Dio dio = Dio();
response = await dio.get("/test?id=12&name=wendu")
print(response.data.toString());
// 请求参数也可以通过对象传递，上面的代码等同于：
response = await dio.get("/test", queryParameters: {"id": 12, "name": "wendu"});
print(response.data.toString());
```

### 发起一个 POST 请求:

```
response = await dio.post("/test", data: {"id": 12, "name": "wendu"});
```

### 发起多个并发请求:

```
response = await Future.wait([dio.post("/info"), dio.get("/token")]);
```

### 下载文件:

```
response = await dio.download("<https://www.google.com/>", "./xx.html");
```

### 发送 FormData:

```
FormData formData = FormData.from({
    "name": "wendux",
    "age": 25,
  });
response = await dio.post("/info", data: formData);
```

### 通过FormData上传多个文件:

```
FormData.fromMap({
    "name": "wendux",
    "age": 25,
    "file": await MultipartFile.fromFile("./text.txt",filename: "upload.txt"),
    "files": [
      await MultipartFile.fromFile("./text1.txt", filename: "text1.txt"),
      await MultipartFile.fromFile("./text2.txt", filename: "text2.txt"),
    ]
 });
response = await dio.post("/info", data: formData);
```

## 封装Dio

### 为什么要封装 dio

上面看了dio的api，非常灵活和简单，那么为什么还要封装呢？因为我们开发需要统一的配置场景。比如：

- 全局token验证
- 自定义拦截器
- 缓存处理
- 统一封装业务错误逻辑
- 代理配置
- 重试机制
- log输出

### 代理配置：

flutter抓包需要配置dio代理，所以我们实现一个代理配置,proxy.dart：

```
// 是否启用代理
const PROXY_ENABLE = false;

/// 代理服务IP
// const PROXY_IP = '192.168.1.105';
const PROXY_IP = '172.16.43.74';

/// 代理服务端口
const PROXY_PORT = 8866;
```

### 错误处理：

一般错误分为网络错误、请求错误、认证错误、服务器错误，所以实现统一的错误处理，认证错误需要登录等认证，所以单独一个类型，请求错误也单独设置一个类型，方便我们定位错误，app_exceptions.dart：

```
import 'package:dio/dio.dart';

/// 自定义异常
class AppException implements Exception {
  final String _message;
  final int _code;

  AppException([
    this._code,
    this._message,
  ]);

  String toString() {
    return "$_code$_message";
  }

  factory AppException.create(DioError error) {
    switch (error.type) {
      case DioErrorType.CANCEL:
        {
          return BadRequestException(-1, "请求取消");
        }
        break;
      case DioErrorType.CONNECT_TIMEOUT:
        {
          return BadRequestException(-1, "连接超时");
        }
        break;
      case DioErrorType.SEND_TIMEOUT:
        {
          return BadRequestException(-1, "请求超时");
        }
        break;
      case DioErrorType.RECEIVE_TIMEOUT:
        {
          return BadRequestException(-1, "响应超时");
        }
        break;
      case DioErrorType.RESPONSE:
        {
          try {
            int errCode = error.response.statusCode;
            // String errMsg = error.response.statusMessage;
            // return ErrorEntity(code: errCode, message: errMsg);
            switch (errCode) {
              case 400:
                {
                  return BadRequestException(errCode, "请求语法错误");
                }
                break;
              case 401:
                {
                  return UnauthorisedException(errCode, "没有权限");
                }
                break;
              case 403:
                {
                  return UnauthorisedException(errCode, "服务器拒绝执行");
                }
                break;
              case 404:
                {
                  return UnauthorisedException(errCode, "无法连接服务器");
                }
                break;
              case 405:
                {
                  return UnauthorisedException(errCode, "请求方法被禁止");
                }
                break;
              case 500:
                {
                  return UnauthorisedException(errCode, "服务器内部错误");
                }
                break;
              case 502:
                {
                  return UnauthorisedException(errCode, "无效的请求");
                }
                break;
              case 503:
                {
                  return UnauthorisedException(errCode, "服务器挂了");
                }
                break;
              case 505:
                {
                  return UnauthorisedException(errCode, "不支持HTTP协议请求");
                }
                break;
              default:
                {
                  // return ErrorEntity(code: errCode, message: "未知错误");
                  return AppException(errCode, error.response.statusMessage);
                }
            }
          } on Exception catch (_) {
            return AppException(-1, "未知错误");
          }
        }
        break;
      default:
        {
          return AppException(-1, error.message);
        }
    }
  }
}

/// 请求错误
class BadRequestException extends AppException {
  BadRequestException([int code, String message]) : super(code, message);
}

/// 未认证异常
class UnauthorisedException extends AppException {
  UnauthorisedException([int code, String message]) : super(code, message);
}
```

### Error拦截器：

有了上面的异常类型，我们要把DioError变成自己定义的异常：

```
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

import 'app_exceptions.dart';

/// 错误处理拦截器
class ErrorInterceptor extends Interceptor {
  @override
  Future onError(DioError err) {
    // error统一处理
    AppException appException = AppException.create(err);
    // 错误提示
    debugPrint('DioError===: ${appException.toString()}');
    err.error = appException;
    return super.onError(err);
  }
}
```

### http单例操作类：

利用单利和配置，实现一个dio的封装。

```
class Http {
  ///超时时间
  static const int CONNECT_TIMEOUT = 30000;
  static const int RECEIVE_TIMEOUT = 30000;

  static Http _instance = Http._internal();
  factory Http() => _instance;

  Dio dio;
  CancelToken _cancelToken = new CancelToken();

  Http._internal() {
    if (dio == null) {
      // BaseOptions、Options、RequestOptions 都可以配置参数，优先级别依次递增，且可以根据优先级别覆盖参数
      BaseOptions options = new BaseOptions(
        connectTimeout: CONNECT_TIMEOUT,

        // 响应流上前后两次接受到数据的间隔，单位为毫秒。
        receiveTimeout: RECEIVE_TIMEOUT,

        // Http请求头.
        headers: {},
      );

      dio = new Dio(options);

      // 添加error拦截器
      dio.interceptors
          .add(ErrorInterceptor());

      // 在调试模式下需要抓包调试，所以我们使用代理，并禁用HTTPS证书校验
      if (PROXY_ENABLE) {
        (dio.httpClientAdapter as DefaultHttpClientAdapter).onHttpClientCreate =
            (client) {
          client.findProxy = (uri) {
            return "PROXY $PROXY_IP:$PROXY_PORT";
          };
          //代理工具会提供一个抓包的自签名证书，会通不过证书校验，所以我们禁用证书校验
          client.badCertificateCallback =
              (X509Certificate cert, String host, int port) => true;
        };
      }
    }
  }

    ///初始化公共属性
  ///
  /// [baseUrl] 地址前缀
  /// [connectTimeout] 连接超时赶时间
  /// [receiveTimeout] 接收超时赶时间
  /// [interceptors] 基础拦截器
  void init(
      {String baseUrl,
      int connectTimeout,
      int receiveTimeout,
      List<Interceptor> interceptors}) {
    dio.options = dio.options.merge(
      baseUrl: baseUrl,
      connectTimeout: connectTimeout,
      receiveTimeout: receiveTimeout,
    );
    if (interceptors != null && interceptors.isNotEmpty) {
      dio.interceptors..addAll(interceptors);
    }
  }
}
```

### 增加取消功能：

```
 /*
   * 取消请求
   *
   * 同一个cancel token 可以用于多个请求，当一个cancel token取消时，所有使用该cancel token的请求都会被取消。
   * 所以参数可选
   */
  void cancelRequests({CancelToken token}) {
    token ?? _cancelToken.cancel("cancelled");
  }
```

### 增加认证header：

```
/// 读取本地配置
  Map<String, dynamic> getAuthorizationHeader() {
    var headers;
    String accessToken = Global.accessToken;
    if (accessToken != null) {
      headers = {
        'Authorization': 'Bearer $accessToken',
      };
    }
    return headers;
  }
```

### 添加cookie和cache：

### 添加cookie管理：

```
  cookie_jar: ^1.0.1
  dio_cookie_manager: ^1.0.0
    // Cookie管理
    CookieJar cookieJar = CookieJar();
    dio.interceptors.add(CookieManager(cookieJar));
     // 加内存缓存
    dio.interceptors.add(NetCache());
```

### 利用sp做磁盘缓存：

```
  shared_preferences: ^0.5.6+3
```

### 编写cache类，net_cache.dart:

```
class CacheObject {
  CacheObject(this.response)
      : timeStamp = DateTime.now().millisecondsSinceEpoch;
  Response response;
  int timeStamp;

  @override
  bool operator ==(other) {
    return response.hashCode == other.hashCode;
  }

  @override
  int get hashCode => response.realUri.hashCode;
}

class NetCacheInterceptor extends Interceptor {
  // 为确保迭代器顺序和对象插入时间一致顺序一致，我们使用LinkedHashMap
  var cache = LinkedHashMap<String, CacheObject>();

  @override
  onRequest(RequestOptions options) async {
    if (!CACHE_ENABLE) return options;

    // refresh标记是否是刷新缓存
    bool refresh = options.extra["refresh"] == true;

    // 是否磁盘缓存
    bool cacheDisk = options.extra["cacheDisk"] == true;

    // 如果刷新，先删除相关缓存
    if (refresh) {
      // 删除uri相同的内存缓存
      delete(options.uri.toString());

      // 删除磁盘缓存
      if (cacheDisk) {
        await SpUtil().remove(options.uri.toString());
      }

      return options;
    }

    // get 请求，开启缓存
    if (options.extra["noCache"] != true &&
        options.method.toLowerCase() == 'get') {
      String key = options.extra["cacheKey"] ?? options.uri.toString();

      // 策略 1 内存缓存优先，2 然后才是磁盘缓存

      // 1 内存缓存
      var ob = cache[key];
      if (ob != null) {
        //若缓存未过期，则返回缓存内容
        if ((DateTime.now().millisecondsSinceEpoch - ob.timeStamp) / 1000 <
            CACHE_MAXAGE) {
          return cache[key].response;
        } else {
          //若已过期则删除缓存，继续向服务器请求
          cache.remove(key);
        }
      }

      // 2 磁盘缓存
      if (cacheDisk) {
        var cacheData = SpUtil().getJSON(key);
        if (cacheData != null) {
          return Response(
            statusCode: 200,
            data: cacheData,
          );
        }
      }
    }
  }

  @override
  onError(DioError err) async {
    // 错误状态不缓存
  }

  @override
  onResponse(Response response) async {
    // 如果启用缓存，将返回结果保存到缓存
    if (CACHE_ENABLE) {
      await _saveCache(response);
    }
  }

  Future<void> _saveCache(Response object) async {
    RequestOptions options = object.request;

    // 只缓存 get 的请求
    if (options.extra["noCache"] != true &&
        options.method.toLowerCase() == "get") {
      // 策略：内存、磁盘都写缓存

      // 缓存key
      String key = options.extra["cacheKey"] ?? options.uri.toString();

      // 磁盘缓存
      if (options.extra["cacheDisk"] == true) {
        await SpUtil().setJSON(key, object.data);
      }

      // 内存缓存
      // 如果缓存数量超过最大数量限制，则先移除最早的一条记录
      if (cache.length == CACHE_MAXCOUNT) {
        cache.remove(cache[cache.keys.first]);
      }

      cache[key] = CacheObject(object);
    }
  }

  void delete(String key) {
    cache.remove(key);
  }
}
```

### dio加入缓存：

```
   // 加内存缓存
      dio.interceptors.add(NetCacheInterceptor());
```

### 重试拦截器：

在网络断开的时候，监听网络，等重连的时候重试：

```
import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';

import 'connectivity_request_retrier.dart';

class RetryOnConnectionChangeInterceptor extends Interceptor {
  final DioConnectivityRequestRetrier requestRetrier;

  RetryOnConnectionChangeInterceptor({
    @required this.requestRetrier,
  });

  @override
  Future onError(DioError err) async {
    if (_shouldRetry(err)) {
      try {
        return requestRetrier.scheduleRequestRetry(err.request);
      } catch (e) {
        return e;
      }
    }
    return err;
  }

  bool _shouldRetry(DioError err) {
    return err.type == DioErrorType.DEFAULT &&
        err.error != null &&
        err.error is SocketException;
  }
}
import 'dart:async';

import 'package:connectivity/connectivity.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

class DioConnectivityRequestRetrier {
  final Dio dio;
  final Connectivity connectivity;

  DioConnectivityRequestRetrier({
    @required this.dio,
    @required this.connectivity,
  });

  Future<Response> scheduleRequestRetry(RequestOptions requestOptions) async {
    StreamSubscription streamSubscription;
    final responseCompleter = Completer<Response>();

    streamSubscription = connectivity.onConnectivityChanged.listen(
      (connectivityResult) {
        if (connectivityResult != ConnectivityResult.none) {
          streamSubscription.cancel();
          responseCompleter.complete(
            dio.request(
              requestOptions.path,
              cancelToken: requestOptions.cancelToken,
              data: requestOptions.data,
              onReceiveProgress: requestOptions.onReceiveProgress,
              onSendProgress: requestOptions.onSendProgress,
              queryParameters: requestOptions.queryParameters,
              options: requestOptions,
            ),
          );
        }
      },
    );

    return responseCompleter.future;
  }
}
```

添加重试拦截器：

```
      if (Global.retryEnable) {
        dio.interceptors.add(
          RetryOnConnectionChangeInterceptor(
            requestRetrier: DioConnectivityRequestRetrier(
              dio: Dio(),
              connectivity: Connectivity(),
            ),
          ),
        );
      }
```

### restful请求：

```
 /// restful get 操作
  Future get(
    String path, {
    Map<String, dynamic> params,
    Options options,
    CancelToken cancelToken,
    bool refresh = false,
    bool noCache = !CACHE_ENABLE,
    String cacheKey,
    bool cacheDisk = false,
  }) async {
    Options requestOptions = options ?? Options();
    requestOptions = requestOptions.merge(extra: {
      "refresh": refresh,
      "noCache": noCache,
      "cacheKey": cacheKey,
      "cacheDisk": cacheDisk,
    });
    Map<String, dynamic> _authorization = getAuthorizationHeader();
    if (_authorization != null) {
      requestOptions = requestOptions.merge(headers: _authorization);
    }
    Response response;
    response = await dio.get(path,
        queryParameters: params,
        options: requestOptions,
        cancelToken: cancelToken ?? _cancelToken);
    return response.data;
  }

  /// restful post 操作
  Future post(
    String path, {
    Map<String, dynamic> params,
    data,
    Options options,
    CancelToken cancelToken,
  }) async {
    Options requestOptions = options ?? Options();
    Map<String, dynamic> _authorization = getAuthorizationHeader();
    if (_authorization != null) {
      requestOptions = requestOptions.merge(headers: _authorization);
    }
    var response = await dio.post(path,
        data: data,
        queryParameters: params,
        options: requestOptions,
        cancelToken: cancelToken ?? _cancelToken);
    return response.data;
  }

  /// restful put 操作
  Future put(
    String path, {
    data,
    Map<String, dynamic> params,
    Options options,
    CancelToken cancelToken,
  }) async {
    Options requestOptions = options ?? Options();

    Map<String, dynamic> _authorization = getAuthorizationHeader();
    if (_authorization != null) {
      requestOptions = requestOptions.merge(headers: _authorization);
    }
    var response = await dio.put(path,
        data: data,
        queryParameters: params,
        options: requestOptions,
        cancelToken: cancelToken ?? _cancelToken);
    return response.data;
  }

  /// restful patch 操作
  Future patch(
    String path, {
    data,
    Map<String, dynamic> params,
    Options options,
    CancelToken cancelToken,
  }) async {
    Options requestOptions = options ?? Options();
    Map<String, dynamic> _authorization = getAuthorizationHeader();
    if (_authorization != null) {
      requestOptions = requestOptions.merge(headers: _authorization);
    }
    var response = await dio.patch(path,
        data: data,
        queryParameters: params,
        options: requestOptions,
        cancelToken: cancelToken ?? _cancelToken);
    return response.data;
  }

  /// restful delete 操作
  Future delete(
    String path, {
    data,
    Map<String, dynamic> params,
    Options options,
    CancelToken cancelToken,
  }) async {
    Options requestOptions = options ?? Options();

    Map<String, dynamic> _authorization = getAuthorizationHeader();
    if (_authorization != null) {
      requestOptions = requestOptions.merge(headers: _authorization);
    }
    var response = await dio.delete(path,
        data: data,
        queryParameters: params,
        options: requestOptions,
        cancelToken: cancelToken ?? _cancelToken);
    return response.data;
  }

  /// restful post form 表单提交操作
  Future postForm(
    String path, {
    Map<String, dynamic> params,
    Options options,
    CancelToken cancelToken,
  }) async {
    Options requestOptions = options ?? Options();
    Map<String, dynamic> _authorization = getAuthorizationHeader();
    if (_authorization != null) {
      requestOptions = requestOptions.merge(headers: _authorization);
    }
    var response = await dio.post(path,
        data: FormData.fromMap(params),
        options: requestOptions,
        cancelToken: cancelToken ?? _cancelToken);
    return response.data;
  }
```

通常我们喜欢静态方法调用，所以新建一个类：

```
import 'package:dio/dio.dart';
import 'package:flutter_dio/http/http.dart';

import 'app_exceptions.dart';
import 'cache.dart';

class HttpUtils {
  static void init(
      {String baseUrl,
      int connectTimeout,
      int receiveTimeout,
      List<Interceptor> interceptors}) {
    Http().init(
        baseUrl: baseUrl,
        connectTimeout: connectTimeout,
        receiveTimeout: receiveTimeout,
        interceptors: interceptors);
  }

  static void setHeaders(Map<String, dynamic> map) {
    Http().setHeaders(map);
  }

  static void cancelRequests({CancelToken token}) {
    Http().cancelRequests(token: token);
  }

  static Future get(
    String path, {
    Map<String, dynamic> params,
    Options options,
    CancelToken cancelToken,
    bool refresh = false,
    bool noCache = !CACHE_ENABLE,
    String cacheKey,
    bool cacheDisk = false,
  }) async {
    return await Http().get(
      path,
      params: params,
      options: options,
      cancelToken: cancelToken,
      refresh: refresh,
      noCache: noCache,
      cacheKey: cacheKey,
    );
  }

  static Future post(
    String path, {
    data,
    Map<String, dynamic> params,
    Options options,
    CancelToken cancelToken,
  }) async {
    return await Http().post(
      path,
      data: data,
      params: params,
      options: options,
      cancelToken: cancelToken,
    );
  }

  static Future put(
    String path, {
    data,
    Map<String, dynamic> params,
    Options options,
    CancelToken cancelToken,
  }) async {
    return await Http().put(
      path,
      data: data,
      params: params,
      options: options,
      cancelToken: cancelToken,
    );
  }

  static Future patch(
    String path, {
    data,
    Map<String, dynamic> params,
    Options options,
    CancelToken cancelToken,
  }) async {
    return await Http().patch(
      path,
      data: data,
      params: params,
      options: options,
      cancelToken: cancelToken,
    );
  }

  static Future delete(
    String path, {
    data,
    Map<String, dynamic> params,
    Options options,
    CancelToken cancelToken,
  }) async {
    return await Http().delete(
      path,
      data: data,
      params: params,
      options: options,
      cancelToken: cancelToken,
    );
  }

  static Future postForm(
    String path, {
    Map<String, dynamic> params,
    Options options,
    CancelToken cancelToken,
  }) async {
    return await Http().postForm(
      path,
      params: params,
      options: options,
      cancelToken: cancelToken,
    );
  }
}
```

## 使用：

初始化：

```
void main() {
  HttpUtils.init(
    baseUrl: "<https://gan.io/>",
  );
  runApp(MyApp());
}
```

在model里写接口请求：

```
  static Future<ApiResponse<CategoryEntity>> getCategories() async {
    try {
      final response = await HttpUtils.get(categories);
      var data = CategoryEntity.fromJson(response);
      return ApiResponse.completed(data);
    } on DioError catch (e) {
      return ApiResponse.error(e.error);
    }
  }
```

调用：

```
void getCategories() async {
  ApiResponse<CategoryEntity> entity = await GanRepository.getCategories();
  print(entity.data.data.length);
}
```