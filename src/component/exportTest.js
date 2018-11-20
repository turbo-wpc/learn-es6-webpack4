//ES6模块化：模块功能主要由两个命令构成：export和import
//  export命令：模块导出
//    1、一个模块就是一个独立的文件，文件内部的所有变量，外部无法获取；如果希望外部能够读取模块内部的某个变量，就必须使用export关键字输出
//    2、通常情况下，export输出的变量、函数或类就是本来的名字，但是可以使用as关键字进行重命名，并且可以用不同的名字进行多次重命名，输出多个名字
//        重命名后的名字或多个名字，指向原来的变量、函数或类
//    3、export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系；一个值并不是接口，不能直接输出，变量、函数或类的输出都必须遵循这样的写法
//        let x = 6
//        function f() {}
//        export x  //错误
//        export 6  //错误
//        export {x:6}  //错误
//        export f  //错误
//    4、export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值
//    5、export命令可以出现在模块的任何位置，只要处于模块顶层就可以；如果处于块级作用域内，就会报错，import命令也是如此

//获取全局定义的变量
// console.log(process.env.NODE_ENV)
// console.log(typeof TEST)
// console.log(typeof Test_TRUE)

//export写法一
//  输出变量
// export let timer = 0
// export let obj = {name: 'Michael'}
//  输出函数或类
// export let add = (x,y)=>x+y
// export class Point {
//   constructor(x,y){
//     this.x = x
//     this.y = y
//   }
//   get(){
//     return `x:${this.x},y:${this.y}`
//   }
// }

//export写法二：等价于写法一，建议优先考虑使用
let timer = 0
let obj = {name: 'Michael'}
let add = (x,y)=>x+y
class Point {
  constructor(x,y){
    this.x = x
    this.y = y
  }
  get(){
    return `x:${this.x},y:${this.y}`
  }
}

export { timer,obj,add,Point,Point as TestPoint }