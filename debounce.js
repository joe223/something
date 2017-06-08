debounce (fn, interval = 0) {
    let last = 0;
    return function (e) {
        let time = +new Date();
        if (time - last >= interval) {
            last = time;
            return fn.call(this, e);
        }
    }
}
