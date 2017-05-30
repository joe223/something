/**
 * jsonp
 */
export default function (url, resolveFnName) {
    let script = document.createElement('script');
    resolveFnName === undefined && (resolveFnName = 'jsonp' + Math.random());
    return new Promise((resolve, reject) => {
        document.body.appendChild(script);
        script.setAttribute('src', url);
        script.onerror = function (e) {
            script.onerror = null;
            document.body.removeChild(script);
            reject && reject(e);
        };
        window[resolveFnName] = function (data) {
            resolve && resolve(data);
            delete window[resolveFnName];
            document.body.removeChild(script);
        };
    });
}
