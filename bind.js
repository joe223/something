// bind with apply
Function.prototype.bind1 = function (context) {
    let that = this
    return function (...args) {
        return that.apply(context, args)
    }
}

// bind without apply
Function.prototype.bind2 = function (context) {
    let that = this
    let id = Symbol('fn')
    return function () {
        context[id] = that
        let val = context[id]()
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
