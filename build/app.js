"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multi_tasks_operation_1 = require("./core/api/multi-tasks-operation");
const multi_promise_1 = require("./models/multi-promise");
let multiplePromise = [];
//create urls 
let multiTasksOperation = new multi_tasks_operation_1.MultiTasksOperation();
const url_1 = { url: 'https://httpbin.org/delay/1', priority: multi_promise_1.IPRIORITY.HIGH };
const url_2 = { url: 'https://httpbin.org/delay/2', priority: multi_promise_1.IPRIORITY.HIGH };
const url_3 = { url: 'fakeHttpRequest', priority: multi_promise_1.IPRIORITY.MEDIUM };
const url_4 = { url: 'https://httpbin.org/delay/4', priority: multi_promise_1.IPRIORITY.MEDIUM };
const url_5 = { url: 'https://httpbin.org/delay/5', priority: multi_promise_1.IPRIORITY.LOW };
let urlQueue = [url_5, url_3, url_1, url_2, url_4].sort(function (a, b) {
    return a.priority.localeCompare(b.priority);
});
console.log('Set priority queue ', urlQueue);
urlQueue.forEach(request => {
    let rq = multiTasksOperation.getRequest(request);
    multiplePromise.push(rq.catch(function () { }));
});
console.log('multiplePromise ', multiplePromise);
multiTasksOperation.launchMultiRequests(multiplePromise);
