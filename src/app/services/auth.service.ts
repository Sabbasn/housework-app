import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserLogin } from "src/models/userLogin.model";
import { UserRegister } from "src/models/userRegister.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient) { }

    apiUrl: string = "https://localhost:7076/api/";

    login(user: UserLogin): Observable<any> {
        const body = { 'email': user.email, 'password': user.password }
        const headers = { 'Content-Type': 'application/json' }
        return this.httpClient.post<string>(this.apiUrl.concat("Users/Login"), body, { headers })
    }

    register(user: UserRegister): Observable<any> {
        const body = {
            'email': user.email,
            'password': user.password,
            'firstName': user.firstName,
            'lastName': user.lastName,
            'phoneNumber': user.phoneNumber,
        }
        const headers = { 'Content-Type': 'application/json' }
        return this.httpClient.post<string>(this.apiUrl.concat("Users/Register"), body, { headers })
    }
}