let $http = {
    setHeaders (xhr, headers) {
        for (let i in headers) {
            if (headers.hasOwnProperty(i)) {
                xhr.setRequestHeader(i, headers[i]);
            }
        }
    },

    get (url, options) {
        let defaultOptions = {
            header: {}
        };
        let xhr = new XMLHttpRequest();
        Object.assign(defaultOptions, options);
        xhr.open('get', url, true);
        this.setHeaders(xhr, defaultOptions.header);
        xhr.send(null);
        return new Promise((resolve, reject) => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(this.getJson(xhr));
                    } else {
                        reject(xhr);
                    }
                }
            }
        });
    },

    post (url, data, options) {
        let defaultOptions = {
            header: {
                'Content-Type': 'application/json;charset=UTF-8',
            }
        };
        Object.assign(defaultOptions, options);
        let xhr = new XMLHttpRequest(defaultOptions.header);
        xhr.open('post', url, true);
        this.setHeaders(xhr, );
        xhr.send(JSON.stringify(data));
        return new Promise((resolve, reject) => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(this.getJson(xhr));
                    } else {
                        reject(xhr);
                    }
                }
            }
        });
    },

    getJson (res) {
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
