import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  apiUrl: string = "https://localhost:7076/api/";
  token = localStorage.getItem("token")

  getUserData(email: string) {
    const headers = { 'Content-Type':'application/json', 'Authorization':`Bearer ${this.token}` }
    return this.httpClient.get(this.apiUrl.concat(`Users/${email}`), {headers})
  }
}
