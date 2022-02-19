The Project-Test is a project test which allow to execute several HTTP(S) GET requests in a certain order, according to a priority associated.

---

Of all the queries associated with the api MultiTasksOperation, only the one(s) with the highest priority will be executed immediately.

  - __Quality of experience__: It aims to get successfully many http request with sequence according priority.

  - __Configurability__: User have to set url directly from app.ts

  - __Easy to use__: One command line to launch the api.

## How to use it? ##############################################################
```sh
# when using npm:
npm install --save typescript

```

You can then directly use the application in command line::
```sh
# when using npm:
npm start
```
This command launch two command which are npx tsc to compile code into javascript file and node build/app.js to launch application.

### Minimal Builds #############################################################

The code has been written with the following languages:
-JavaScript
-TypeScript

No dependencies are used, except to allow the build (for example of a
TypeScript project, ES6...).


## API #########################################################################

The API is actually simple.
It allow user to launch application and test url request.
The idea is to use Promise from javascript to execute several HTTP(S) GET requests in a certain order, according to a priority (defined in the model through an interface IRequestHttpOptions) associated with each.
Of all the queries associated, only the one(s) with the highest
priority will be executed immediately.
When these are finished, it will now be the turn of requests with priority
next (the second highest) and so on.

NB: Among the default urls set, one is wrong and allow user to keep going on.

The main method from multi task operations is the getRequest method which return a promise. It takes as entry an IRequestHttpOptions object (see interface) and resolve it if the status is correct.
``` typescript
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
```

You can also test for one request and see the behavior through the api and the promise.
``` typescript
multiPromise.getRequest(url_1).then(response => {
  console.log('reponse ', response);
}).catch(error => {
  console.log('error ', error);
});
```

Requests already in progress are never cancelled, even if new requests with
higher priority have since been added because promise returned use the method all and sequence all directive one by one.
``` typescript
public launchMultiRequests(multipleRequest: Promise<IRequestHttpOptions>[]) {
    return Promise.all(multipleRequest)
      .then(values => {
        console.log(values.toString())
      })
      .catch(error => {
        console.error('error', error);
      });
  }
```

## INTERFACE #########################################################################
The priority right now are numbers and handling by enum.
It allows to handle multiple priority like extrem, high, medium, low.
The choice of number is due to easy to sort data. 
``` typescript
export enum IPRIORITY {
    EXTREM = "0",
    HIGH = "1",
    MEDIUM = "2",
    LOW = "3"
}
```

The interface allows us to create our HTTP Request object. The query and its construction does not matter because the goal is to be as generic as possible.
The goal will be to use this interface to set the url and the priority of the request.
This interface also contains several other attributes such as isSuccess or isFinished which will subsequently allow you to follow a strategy when the button for adding or removing a request will be available to manage the status of the request.
If the promise returns a favorable result, it will suffice to set the success and finish attributes to true. On the other hand, if an error is detected, we set them to false, and another isError property will be true.
``` typescript
export interface IRequestHttpOptions {
    url: string;
    addToResults?: boolean,
    isFinished?: boolean,
    isSuccess?: boolean,
    isError?: boolean,
    priority: string;
}
```

### Build ######################################################################

We use npm scripts to bundle, and test the app defining in the package.json.
```sh
# build and start the sequence
npm start
```

### A future feature ########################################################

Right now it is impossible to cancel a request in progress manually.
However the request which must be interrupted is launch and won't be executed by the program. It won't cancel the next one.
It miss an interaction with frontend to allow user to cancel request while it is in waiting.

A cancel function must be create for “pending” request.

## Target support ##############################################################
Get a node environnement[https://nodejs.org/fr/download/]