var fs = require("fs");
var data = 'woshi da';
var data2 = '';

// 创建可读流
var readerStream = fs.createReadStream('input.txt');

// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function(a) {
   data += a;
   data2 = a;
});

readerStream.on('end',function(){
   console.log(data);
   console.log(data2);
});

// readerStream.on('end',function(){
//     console.log(chunk);
//  });

readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");