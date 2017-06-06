let $http = {
    setHeaders (xhr, headers) {
        for (let i in headers) {
            if (headers.hasOwnProperty(i)) {
                xhr.setRequestHeader(i, headers[i]);
            }
        }
    },

    get (url, options) {
        let xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        this.setHeaders(xhr, options);
        xhr.send(null);
        return new Promise((resolve, reject) => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(this.json(xhr));
                    } else {
                        reject(xhr);
                    }
                }
            }
        });
    },

    post (url, data, options) {
        let defaultOptions = {
            'Content-Type': 'application/json;charset=UTF-8',
        };
        let xhr = new XMLHttpRequest();
        xhr.open('post', url, true);
        this.setHeaders(xhr, Object.assign(defaultOptions, options));
        xhr.send(JSON.stringify(data));
        return new Promise((resolve, reject) => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(this.json(xhr));
                    } else {
                        reject(xhr);
                    }
                }
            }
        });
    },

    delete (url, data, options) {
        let defaultOptions = {
            'Content-Type': 'application/json;charset=UTF-8',
        };
        let xhr = new XMLHttpRequest();
        xhr.open('delete', url, true);
        this.setHeaders(xhr, Object.assign(defaultOptions, options));
        xhr.send(JSON.stringify(data));
        return new Promise((resolve, reject) => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(this.json(xhr));
                    } else {
                        reject(xhr);
                    }
                }
            }
        });
    },

    json (res) {
        let response = {};
        response.response = res.response;
        response.timeout = res.timeout;
        response.status = res.status;
        response.res = res;
        response.json = () => {
            response.data = JSON.parse(res.response);
        }
        return response;
    }
}
export default $http;
