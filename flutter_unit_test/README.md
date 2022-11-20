# README

## 纯dart项目cil

```bash
# Create a small app
dart create -t console-full cli

# Run the app
cd cli
dart run
# Hello world: 42!

# test
dart test/cil_test.dart
#00:00 +0: calculate
#00:00 +1: All tests passed!
```

### 生成 junit 格式的测试报告(xml)

使用[dart-junitreport](https://github.com/TOPdesk/dart-junitreport)

```bash
pub run test simple_test.dart --reporter json > example.jsonl

pub global run junitreport:tojunit --input example.jsonl --output TEST-report.xml

```

### 测试报告 xml转 html

https://github.com/inorton/junit2html

```bash
npm run junit2html TEST-report.xml --outreport.html
```

## 创建 flutter 项目my_app

```bash
# Create a small app
flutter create my_app

# Run the app
cd my_app
flutter run

# test
flutter test test/widget_test.dart
#00:06 +1: All tests passed!
```

# web api 测试说明

## 测试流程

### 1. 跑测试脚本并获得 junit 格式的 xml 文件

```bash
cd ./app_test/web_api_test/webapi
pub run test test/webApiTest_test.dart --reporter json | tojunit  --output report.xml
```

### 2. 将 xml 转 html

```bash
cd ./app_test/web_api_test/xml2html
junit2html report.xml --out report.html
```

### 3. 将report.html移动 report 文件夹

```bash
move report.html ./app_test/web_api_test/report
```

### 4. 在 jenkins 里 build

[jenkins](http://142.93.151.146:8080/job/Mobile-WebApi-test/)

1. 更新 git
2. 自动更新报告 html 指向

## 安装

### 1. junitreport

主要作用,在运行dart测试脚本的时,生成 junit 格式的 xml 文件

#### 1) 下载

[junitreport](https://github.com/TOPdesk/dart-junitreport)

#### 2) 安装

```bash
pub global activate junitreport
```

#### 3) 使用

```bash
pub run test simple_test.dart --reporter json | tojunit
```

### 2. junit-lib

#### 1) 下载

[junit-lib](https://www.npmjs.com/package/@naturalcycles/junit-lib)

#### 2) 安装

```bash
npm i
```

#### 3) 使用

将 xml 拷贝到当前文件夹

```bash
# Convert `report.xml` into `report.html` 
junit2html report.xml --out report.html
 
# Merge all xml files in `report` dir into one html report 
junit2html './reports/**/*.xml' --out report.html
```