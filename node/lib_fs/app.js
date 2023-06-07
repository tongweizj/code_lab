const { mainModule } = require('process');
const fs = require('./fs-async.js');
const path = require('path');



// // promise风格
// fs.readFile('input.txt').then(data => {
// 	console.log("异步promise读取: " + data.toString());
// }).catch(err => {
// 	console.error(err);
// });
// await风格，tip：要在async函数中方可使用await语法
async function main(){
  const fileFullName = path.resolve(__dirname, 'mail.t');
  const data = await fs.readFile(fileFullName);
  console.log("异步await读取: " + data.toString());
}

main()