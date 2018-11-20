//import命令：模块导入
//  1、使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块
//  2、import命令接受一对大括号，里面指定要从其他模块导入的变量名；大括号里面的变量名，必须与被导入模块对外接口的名称（或者as重命后的名字）相同
//  3、import命令可以使用as关键字，将输入的变量重命名
//  4、import命令输入的变量都是只读的，因为它的本质是输入接口
//      a、所以，不允许在加载模块的脚本里面，改写接口；但，如果导入的是一个对象，改写对象的属性是允许的，并且其他模块也可以读到改写后的值
//      b、改写导入对象的属性很难查错，建议凡是输入的变量，都当作完全只读，轻易不要改变它的属性
//  5、import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js后缀可以省略
//  6、import命令具有提升效果，会提升到整个模块的头部，首先执行
//  7、import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构
//      import { 'f' + 'oo' } from 'my_module'  //报错
//      let module = 'my_module';import { foo } from module  //报错
//      if (x === 1) {import { foo } from 'module1'} else {import { foo } from 'module2'}  //报错
//  8、import语句会执行所加载的模块，因此直接引入css等文件便可以生效
//      多次重复执行同一句import语句，那么只会执行一次，而不会执行多次
//  注意：目前阶段，通过 Babel 转码，CommonJS 模块的require命令和 ES6 模块的import命令，可以写在同一个模块里面，但是最好不要这样做
//       因为import在静态解析阶段执行，是一个模块之中最早执行的，所以代码执行可能不会得到预期结果


console.log(obj.name) //import提升

import { timer as time,obj,add,Point,TestPoint } from "./exportTest"

// time = 2 //导入的接口只读
console.log(time)
obj.name = 'newName'  //改写对象的属性是允许的
console.log(obj.name)

export {
  time,
  obj,
  add,
  Point,
  TestPoint
}