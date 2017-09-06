// bind with apply
Function.prototype.bind1 = function (context) {
    let that = this
    return function (...args) {
        return that.apply(context, args)
    }
}

// bind without apply

// bind without apply
Function.prototype.bind2 = function (context, args) {
    let that = this
    let id = Symbol('fn')
    let vals = []
    vals.concat(args ? args : [])
    context = context || window
    return function () {
        context[id] = that
        if (arguments.length > 1) {
             vals = vals.concat(Array.prototype.slice.call(arguments))
        }
        let val = eval('context[id](' + vals.reduce((res, item, index, arr) => {return res + 'vals[' + index + ']' + (index === arr.length - 1 ? '' : ',')}, '') + ')')
        delete context[id]
        return val
    }
}

let obj = {
    name: 1
}

function log() {
    console.log(this.name)
}

console.log(log.bind2(obj))