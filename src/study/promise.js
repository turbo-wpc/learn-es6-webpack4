// Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject
// resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved）
// reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected）
// Promise 创建后就会立即执行

// node1：只有执行resolve/reject两个函数才能改变Promise的状态，进而触发then/catch回调执行，否则Promise将一直处于pending状态！！！
//    如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数

// node2：resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例
// 例子：当Promise实例p1的resolve的参数是另一个Promise实例p2，p2的状态就会传递给p1，p2的状态决定了p1的状态。
//      如果p2的状态是pending，那么p1的回调函数就会等待p2的状态改变；如果p2的状态已经是resolved/rejected，那么p1对应的then/catch函数才会执行

// node3：then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。
//    因此可以采用链式写法，即then方法后面再调用另一个then方法
//    1、前一个then函数完成以后，可以将结果以返回值(return)的形式，传入后一个then函数(以函数参数的形式接收)
//    2、当前一个then没有返回值 === return undefined
//    3、当前一个then返回值是另一个Promise对象，后一个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化再执行

// node4：catch(()=>{}) === then(null, ()=>{})
// node5：finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作

const timer = (ms) => {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      return resolve(2)
    },ms)
  })
}

timer(2000)
.then(()=>console.log(1))
.then(null,()=>{
  console.log(2)
  throw new Error()
})
.then(()=>console.log(3))
.catch(()=>console.log(4))