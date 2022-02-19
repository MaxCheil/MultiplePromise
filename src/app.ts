import { MultiTasksOperation } from "./core/api/multi-tasks-operation";
import { IPRIORITY, IRequestHttpOptions } from "./models/multi-promise";

let multiplePromise: Promise<IRequestHttpOptions>[] = [];
//create urls 
let multiTasksOperation = new MultiTasksOperation();
const url_1: IRequestHttpOptions = {url: 'https://httpbin.org/delay/1', priority: IPRIORITY.HIGH}
const url_2: IRequestHttpOptions = {url: 'https://httpbin.org/delay/2', priority: IPRIORITY.HIGH}
const url_3: IRequestHttpOptions = {url: 'fakeHttpRequest', priority: IPRIORITY.MEDIUM}
const url_4: IRequestHttpOptions = {url: 'https://httpbin.org/delay/4', priority: IPRIORITY.MEDIUM}
const url_5: IRequestHttpOptions = {url: 'https://httpbin.org/delay/5', priority: IPRIORITY.LOW}

let urlQueue = [url_5, url_3, url_1, url_2, url_4].sort(function (a, b) {
    return a.priority.localeCompare(b.priority);
});
console.log('Set priority queue ', urlQueue);

urlQueue.forEach(request => {
    let rq = multiTasksOperation.getRequest(request);
    multiplePromise.push(rq.catch(function() {}))
})
console.log('multiplePromise ', multiplePromise)
multiTasksOperation.launchMultiRequests(multiplePromise);