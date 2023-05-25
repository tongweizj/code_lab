const fs = require('fs');


// 读取文件
fs.readFile('write.txt', 
    // 读取文件完成时调用的回调函数
    function(err, data) {  
        if (err) throw err; 
        // 数据是包含文件内容的缓冲区
        console.log(data.toString('utf8')) 
 });


const data =  fs.readFile('write.txt','utf8');
console.log(data.toString('utf8')) 