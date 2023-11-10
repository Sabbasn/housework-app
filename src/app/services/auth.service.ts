import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isDevMode } from "@angular/core";
import jwtDecode from "jwt-decode";
import { Observable } from "rxjs";
import { UserLogin } from "src/models/auth/userLogin.model";
import { UserRegister } from "src/models/auth/userRegister.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient) { }

    apiUrl: string = isDevMode() ? "https://localhost:7076/api/":"https://houseworkapi.azurewebsites.net/api/";

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

    isTokenValid(token: string) {
        const decoded: any = jwtDecode(token)
        const expDate = new Date(decoded["exp"] * 1000).getTime()
        if (expDate > Date.now()) {
            return true
        }
        return false
    }
}