"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiTasksOperation = void 0;
const stream_1 = require("stream");
/**
 * @class MultiTasksOperation
 */
class MultiTasksOperation extends stream_1.EventEmitter {
    constructor() {
        super();
    }
    /**
     * Request url with a promise
     * @param requestHttp requestHttpOptions
     * @returns a promise of a GET request http.
     */
    getRequest(requestHttp) {
        return new Promise((resolve, reject) => {
            var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            const request = new XMLHttpRequest();
            request.open('GET', requestHttp.url);
            request.onload = function () {
                if (this.status === 200) {
                    resolve(this.responseText);
                }
                else {
                    reject(new Error(this.statusText));
                }
            };
            request.onerror = function () {
                reject(new Error('XMLHttpRequest Error: ' + this.statusText));
            };
            request.send();
        }).catch(error => {
            //console.error('error', error);
        });
    }
    /**
     * Allow to launch multiple requests for user
     * @param multipleRequest Promise<IRequestHttpOptions>[]
     * @returns a sequence of response from HTTP request
     */
    launchMultiRequests(multipleRequest) {
        return Promise.all(multipleRequest)
            .then(values => {
            console.log(values.toString());
        })
            .catch(error => {
            console.error('error', error);
        });
    }
}
exports.MultiTasksOperation = MultiTasksOperation;
