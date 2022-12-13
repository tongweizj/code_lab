// 生成一个 >=0 && < 1 的随机数
console.log(Math.random()) 

//取整
console.log(Math.floor(Math.random() * 20));


// Generate Random Whole Numbers within a Range
const min = 100;
const max = 1000;
const random = Math.floor(Math.random() * (max - min + 1)) + min
console.log(random);