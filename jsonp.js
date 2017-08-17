/**
 * jsonp
 */
export default function (url, resolveFnName) {
    let script = document.createElement('script');
    resolveFnName === undefined && (resolveFnName = 'jsonp' + Math.random().toString(36).substr(2));
    return new Promise((resolve, reject) => {
        url += `?callback=${ resolveFnName }`;
        document.body.appendChild(script);
        script.src = url;
        script.type = 'text/javascript';
        script.async = true;
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
