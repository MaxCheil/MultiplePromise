export enum IPRIORITY {
    EXTREM = "0",
    HIGH = "1",
    MEDIUM = "2",
    LOW = "3"
}

export interface IRequestHttpOptions extends IRequestHTTP {
    url: string;
    addToResults?: boolean,
    isFinished?: boolean,
    isSuccess?: boolean,
    isError?: boolean,
    priority: string;
}
export interface IRequestHTTP  {
    "args"?: any,
    "data"?: any,
    "files"?: any,
    "hearders"?: IHeaders,
    "origin"?: string,
    "url"?: string
}

export interface IHeaders {
    "Accept": string,
    "Accept-Encoding": string,
    "Accept-Language": string,
    "Cache-Control": string,
    "Host": string,
    "Sec-Ch-Ua": string,
    "Sec-Ch-Ua-Mobile": string, 
    "Sec-Ch-Ua-Platform": string, 
    "Sec-Fetch-Dest": string, 
    "Sec-Fetch-Mode": string, 
    "Sec-Fetch-Site": string, 
    "Sec-Fetch-User": string, 
    "Upgrade-Insecure-Requests": string, 
    "User-Agent": string, 
    "X-Amzn-Trace-Id": string
}