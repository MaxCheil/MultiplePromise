import { EventEmitter } from "stream";
import { IRequestHttpOptions } from "../../models/multi-promise";

/**
 * @class MultiTasksOperation
 */
export class MultiTasksOperation extends EventEmitter {

  constructor() {
    super();
  }

  /**
   * Request url with a promise
   * @param requestHttp requestHttpOptions
   * @returns a promise of a GET request http.
   */
  public getRequest(requestHttp: IRequestHttpOptions): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        const request = new XMLHttpRequest();
        request.open('GET', requestHttp.url);
        request.onload = function () {
          if (this.status === 200) {
            resolve(this.responseText);
          } else {
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
  public launchMultiRequests(multipleRequest: Promise<IRequestHttpOptions>[]) {
    return Promise.all(multipleRequest)
      .then(values => {
        console.log(values.toString());
      })
      .catch(error => {
        console.error('error', error);
      });
  }
}