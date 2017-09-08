// Promise.all

function all (list) {
    const taskList = new Array(list.length);
    let count = list.length;        // in case res === undefined
    
    return new Promise((resolve, reject) => {
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

// test code
let list = [
    new Promise((resolve, reject) => {
        setTimeout(res => {
            resolve()
        }, 1000);
    }), 
    new Promise((resolve, reject) => {
        setTimeout(res => {
            resolve('2 done')
        }, 2000);
    }),
    new Promise((resolve, reject) => {
        setTimeout(res => {
            reject('3 error')
        }, 2000);
    }),
];

all(list).then(res => {
    console.log('all result:', res);
}).catch(err => {
    console.error('err:', err);
})
