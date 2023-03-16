// ## 截取字符串
// - substring() 方法；
// - substr() 方法；
// - slice() 方法；

// ### 方法1：substring() 方法
// string.substring(from, to)
// - 从 from 位置截取到 to 位置，
// - to 可选，没有设置时默认到末尾。

const str = "www.runoob.com!";
console.log(str.substring(4)); // 从第 5 个字符开始截取到末尾
console.log(str.substring(4, 10)); // 从第 5 个字符开始截取到第10个字符

// ### 方法3：slice() 方法
// slice(start,end) 方法用于提取字符串的某个部分（从参数 start 到 end 位置），并以新的字符串返回被提取的部分。类似 substring()。

console.log(str.slice(4)); // 从第 5 个字符开始截取到末尾
console.log(str.slice(4, 10)); // 从第 5 个字符开始截取到第10个字符
