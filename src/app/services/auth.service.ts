import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    constructor(private httpClient: HttpClient) { }

    bearerToken: any;
    apiUrl: string = "https://localhost:7076/api/";

    login(email: string, password: string) : Observable<any> {
        const body = { 'email':email, 'password':password }
        const headers = { 'Content-Type':'application/json' }
        return this.httpClient.post<string>(this.apiUrl.concat("Users/Login"), body, {headers})
    }
}