// Map
const m = new Map()
const o = {p: 'Hello World'}

m.set(o,'content')
console.log(m.get(o))
console.log(m.has(o))
m.delete(o)
console.log(m.has(o))
