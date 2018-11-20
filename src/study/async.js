
//async 函数返回一个 Promise 对象
//async 函数内部 return 返回的值，会成为 then 方法回调函数的参数
//async 函数返回的 Promise 对象，必须等到内部所有的 await 命令的 Promise 对象执行完，才会发生状态改变（resolve），除非抛出异常
//如果 async 函数内部抛出异常，则会导致返回的 Promise 对象状态变为 reject 状态，抛出的错误而会被 catch 方法回调函数接收到
//注意：《正常情况下，await 命令后面跟着的是 Promise ，如果不是的话，也会被转换成一个 ‘立即’ resolve 的 Promise》！！！
//当 async 函数中只要一个 await 出现 reject 状态，则后面的 await 都不会被执行，解决办法：可以添加 try/catch

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
      this.t = 2
      resolve()
    },2000))

    console.log(this.t)
    return this.t
  }
}

let As =  new Async()

As.test()
.then(res=>console.log(res))
.catch(()=>console.log(As.t))