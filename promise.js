// Promise


function Promise (task) {
    this.status = 'pending';
    this.task = task;
    return this;
}

Promise.prototype.then = function (resolve) {
    this.resolve = resolve || function () {};
    this.task && this.task(this.resolve, this.reject);    

    return this;
}
Promise.prototype.catch = function (reject) {
    this.reject = reject || function () {};
    return this;
}
Promise.prototype.resolve = function () {
    this.status = 'fulfilled';    
}
Promise.prototype.reject = function (err) {
    this.status = 'rejected';    
    console.error(err);
}


// Promise.all

Promise.all = function (list) {
    const taskList = new Array(list.length);
    let count = list.length;        // in case res === undefined
    
    return new Promise(function (resolve, reject) {
        list.map((item, index, arr) => {
            list[index].then(res => {
                taskList[index] = res;
                (--count === 0) && resolve(taskList);
            }).catch(err => {
                reject(err);
            });
        });
    });
}

// Promise.race

Promise.race = function (list) {
    return new Promise(function (resolve, reject) {
        list.map((item, index, arr) => {
            list[index].then(res => {
                if (this.status === 'pending') {
                    this.status = 'fulfilled';            
                    resolve(res);
                }
            }).catch(err => {
                reject(err);
            });
        });
    });
}

// test code
let list = [
    new Promise((resolve, reject) => {
        setTimeout(res => {
            resolve({name: 'joe'})
        }, 1000);
    }), 
    new Promise((resolve, reject) => {
        setTimeout(res => {
            resolve('2 done')
        }, 2000);
    }),
    new Promise((resolve, reject) => {
        setTimeout(res => {
            resolve('3 done')          // reject cause error
        }, 2000);
    }),
];

Promise.all(list).then(res => {
    console.log('all result:', res);
}).catch(err => {
    console.error('err:', err);
});

Promise.race(list).then(res => {
    console.log('race result:', res);
}).catch(err => {
    console.error('err:', err);
})


// let a = new Promise((resolve, reject) => {
//     setTimeout(e => {
//         resolve('resolve')
//     }, 0)
// }).then((e) => {
//     console.log(e);
// }).catch(err => {
//     console.error(err);
// });

