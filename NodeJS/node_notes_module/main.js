

// 封装模式 exports_function
// exports.world = function() {}
const hello = require('./exports_function')
hello.world()
hello.cool()

// 导入 class 封装成 moudle
const Square = require('./exports_class');
const mySquare = new Square(2);
console.log(`The area of mySquare is ${mySquare.area()}`);


// 封装模式 odule_exports_function_name
const Hello = require('./module_exports_function_name'); 
const newHello = new Hello(); 
newHello.setName('Max'); 
newHello.sayHello(); 

// 封装模式 module_exports_multi_function_name
const Hello2 = require('./module_exports_multi_function_name');

// 注册方法 1
// 错误 
// hello = new Hello(); 
// hello.setName('BYVoid'); 
// hello.sayHello(); 
// hello.saycool()

// 正确

const hello2 = new Hello2.hi2(); 
hello2.setName('Max'); 
hello2.sayHello(); 
hello2.saycool()


// hello3 = new Hello2.hello3(); 
// hello3.setName('Tong'); 
// hello3.sayHello(); 
// hello3.saycool()

// 注册方法 2
// hi2= new Hello2.hi2(); 
// hi2.setName('BYVoid'); 
// hi2.sayHello(); 
// hi2.saycool();

// hello3 = new Hello.hi3(); 
// hello3.setName('BYVoid'); 
// hello3.sayHello(); 
// hello3.saycool()

