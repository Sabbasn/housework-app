import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddChore } from 'src/models/addChore.model';
import { Chore } from 'src/models/chore.model';
import { Room } from 'src/models/room.model';
import { Service } from 'src/models/service.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  apiUrl: string = "https://localhost:7076/api";
  token = localStorage.getItem("token")

  getUserData(email: string) {
    const headers = { 'Content-Type':'application/json', 'Authorization':`Bearer ${this.token}` }
    localStorage.setItem("email", email)
    return this.httpClient.get(this.apiUrl.concat(`/Users/${email}`), {headers})
  }

  getRooms() : Observable<Room[]> {
    const headers = { 'Content-Type':'application/json', 'Authorization':`Bearer ${this.token}` }
    return this.httpClient.get<Room[]>(this.apiUrl.concat(`/Rooms`), {headers})
  }

  getChores(roomName: string) : Observable<Chore[]> {
    const headers = { 'Content-Type':'application/json', 'Authorization':`Bearer ${this.token}` }
    return this.httpClient.get<Chore[]>(this.apiUrl.concat(`/Chore/${roomName}`), {headers})
  }

  removeChore(id: number) : Observable<Chore> {
    const headers = { 'Content-Type':'application/json', 'Authorization':`Bearer ${this.token}` }
    return this.httpClient.delete<Chore>(this.apiUrl.concat(`/Chore/${id}`), {headers})
  }

  addChore(roomName: string, chore: AddChore) : Observable<Chore> {
    const headers = { 'Content-Type':'application/json', 'Authorization':`Bearer ${this.token}` }
    const body = {
      'name' : chore.name,
      'description' : chore.description,
      'status' : chore.status
    }
    return this.httpClient.post<Chore>(this.apiUrl.concat(`/Chore/${roomName}`), body, {headers})
  } 
}
