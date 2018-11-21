//1、函数参数默认值
//  如果传入undefined，将触发该参数等于默认值，null则没有这个效果。
function log(x,y='world'){
  console.log(x,y)
}
// log('Hello')
// log('Hello', 'China')
// log('Hello', '')

//2、与解构赋值默认值结合使用
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined

function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo() // undefined 5

//3、rest 参数：ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。
//  rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
//  arguments对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用Array.prototype.slice.call先将其转为数组。
//  rest 则是一个真正的数组
//  rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
function fooRest(x,...arr){
  console.log(arr)
}
fooRest(1,3,5)

//尾调用（Tail Call）是指某个函数的最后一步是调用另一个函数。
// 此种情况不属于尾调用
// function f(x){
//   g(x);
// }
// 等同于以下，即 并没有在最后一步执行
// function f(x){
//   g(x);
//   return undefined;
// }