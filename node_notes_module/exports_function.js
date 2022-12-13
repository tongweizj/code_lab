/*
 * 方法一
 * exports.world 就表示 world 这个成员函数，是可以在外部模块调用 
 * 每一个 exports 类似一个方法
 */

exports.world = function() {
    console.log('hello world!')
}

exports.cool = function() {
    console.log('cool man!')
}