import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: String = 'http://localhost:9000'
  accessToken:String = '';

  constructor(private http: HttpClient) { }

  setAccessToken(tokenObj){  
      console.log(tokenObj.access_token);
      this.accessToken = tokenObj.access_token; 
  }

  getAccessToken(){
    return this.accessToken;
  }

  createAccessToken(code:String) {
    return this.http.post(this.baseUrl+"/token", {"code":code});
  }

  getUser(){
    return this.http.post(this.baseUrl+"/data", {"accessToken":this.getAccessToken()});
  }

}
