

有须要从前端操做服务器执行shell命令的需求



创建一个process.js文件

```
var process = require('child_process');
//直接调用命令
exports.createDir = function (){process.exec('D: && cd testweb && md mydir',
	  function (error, stdout, stderr) {
		if (error !== null) {
		  console.log('exec error: ' + error);
		}
	});
}
//调用执行文件
exports.openApp = function(){
	process.execFile('D:/testweb/aaa.bat',null,{cwd:'D:/'},
	  function (error,stdout,stderr) {
		if (error !== null) {
		  console.log('exec error: ' + error);
		}
	});
}
```

这里的命令是写死的，若是须要动态调用就把命令写成批处理文件（linux写shell脚本

也可使用process.exec('test.bat',...) 和 process.exec('sh test',...)执行文件

