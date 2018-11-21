
// async 函数返回一个 Promise 对象
// async 函数内部return语句返回的值，会成为then方法回调函数的参数
// async 函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误
// 也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数
// 而async 函数内部抛出错误时，会导致返回的 Promise 对象变为reject状态，由catch方法回调函数接收抛出的错误对象(无需return)

// node1！：正常情况下，await命令后面是一个 Promise 对象
//        此时，await语句的值就是resolve回调的参数: resolve(value)，即Promise对象 then中回调函数能获取到的值
//            没有则为undefined: resolve()
//        如果不是Promise 对象，就立即返回对应的值
//            没有返回值 === return undefined（如，没有返回值 或 未用Promise标识需要异步获取返回值 的函数）

// node2：只要一个await语句后面的 Promise 变为reject，那么后面的 await 都不会被执行，async 函数返回的Promise会变为reject状态，并且reject的参数会被catch方法的回调函数接收到
//        解决方案1：将await语句放在try...catch结构里面，这样不管这个操作是否成功，后面的await语句都会执行
//                  如果有多个await命令，可以统一放在try...catch结构中
//        解决方案2：await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误

// node3：多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发，以缩短程序的执行时间
//        实现方案1：await Promise.all([...])
//        实现方案2：利用Promise 创建后就会立即执行的特性
//                  let firstPromise = getFoo(),secPromise = getBar()
//                  let foo = await fooPromise
//                  let bar = await barPromise

// node4：await命令只能用在async函数之中，如果用在普通函数，就会报错

// node5！：如果某一个await语句后面的 Promise 一直处于pending状态(没有执行resolve/reject)没有变化，整个async函数也将一直处于阻塞状态

class Async {
  constructor(){
    this.t = 0
  }
  async test(){
    //正常情况下，await 命令后面跟着的是 Promise ，如果不是的话，也会被转换成一个 立即 resolve 的 Promise
    //此时不会有2秒延时
    // this.t = await setTimeout(()=>{
    //   return 2
    // },2000)

    //当 async 函数中只要一个 await 出现 reject 状态，则后面的 await 都不会被执行，解决办法：可以添加 try/catch
    //await Promise.reject()
    try {
      await Promise.reject(new Error('6'))
    }catch(error) {
      console.log(error.message)
    }

    await new Promise(resolve => setTimeout(()=>{
      resolve()
      return this.t = 2
    },2000))

    let x = await new Promise(resolve=>{
      setTimeout(()=>{
        resolve(4)
      },2000)
    })

    console.log(x)
    return this.t
  }
}

let As =  new Async()

As.test()
.then(res=>console.log(3))
.catch(err=>console.log(err.message))
