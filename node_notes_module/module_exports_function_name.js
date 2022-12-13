/*
 * 方法二 module.exports = Hello;
 * Hello 类似一个 class, setName sayHello 是 Hello 的方法
 */

function Hello() { 
    var name; 
    this.setName = function(thyName) { 
        name = thyName; 
    }; 
    this.sayHello = function() { 
        console.log('Hello ' + name); 
    }; 
}; 

module.exports = Hello;