export function httpGet(endpoint) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `http://localhost:3000/${endpoint}`, true);
        // xhr.responseType = 'text';
        xhr.onload = function () {
            const status = xhr.status;
            if (status == 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(status);
            }
        };
        xhr.send();
    });
}
