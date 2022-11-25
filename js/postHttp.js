export function httpPost(endpoint, body) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `http://localhost:3000/${endpoint}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json') 
        xhr.onload = function () {
            const status = xhr.status;
            if (status == 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(status);
            }
        };
        xhr.send(body);
    });
}

