import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }

  public getCookie(k: string) {
    var cookies = " " + document.cookie;
    var key = " " + k + "=";
    var start = cookies.indexOf(key);

    if (start === -1) return null;

    var pos = start + key.length;
    var last = cookies.indexOf(";", pos);

    if (last !== -1) return cookies.substring(pos, last);

    return cookies.substring(pos);
  }

  public setCookie(k: string, v: string, expira: number, path: string) {
    if (!path) path = "/";

    var d = new Date();
    d.setTime(d.getTime() + (expira * 1000));

    document.cookie = encodeURIComponent(k) + "=" + encodeURIComponent(v) + "; expires=" + d.toUTCString() + "; path=" + path;
  }

  public deleteCookie(k: string) {
    document.cookie = k + "=;expires=Wed; 01 Jan 1970;path=/";
  }

  public static jsonToQueryString(options: any) {

    let queryString = '';
    for (let entry in options) {
      if (options[entry]) {
        queryString += entry + '=' + encodeURIComponent(options[entry]) + '&';
      }
    }

    // remove last '&'
    queryString = queryString.substring(0, queryString.length - 1);

    return queryString;
  }

  public static isEmptyOrSpaces(text?: string) {
    if (text != null && text != undefined) {
      return !text.toString() || text.toString().match(/^ *$/) !== null || text.toString().match(/^\s*$/) !== null;
    }

    return true;
  }
}
