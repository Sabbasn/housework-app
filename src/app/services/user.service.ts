import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/models/auth/service.model';
import { AddChore } from 'src/models/housework/addChore.model';
import { Chore } from 'src/models/housework/chore.model';
import { Room } from 'src/models/housework/room.model';

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

  addRoom(room: Room) : Observable<Room> {
    const headers = { 'Content-Type':'application/json', 'Authorization':`Bearer ${this.token}` }
    const body = {
      'name' : room.name,
    }
    return this.httpClient.post<Room>(this.apiUrl.concat(`/Rooms`), body, {headers})
  }

  getChores(roomName: string) : Observable<Chore[]> {
    const headers = { 'Content-Type':'application/json', 'Authorization':`Bearer ${this.token}` }
    return this.httpClient.get<Chore[]>(this.apiUrl.concat(`/Chores/${roomName}`), {headers})
  }

  updateChore(chore: Chore) : Observable<Service<Chore>> {
    const headers = { 'Content-Type':'application/json', 'Authorization':`Bearer ${this.token}` }
    const body = {
      'status': chore.status
    }
    return this.httpClient.put<Service<Chore>>(this.apiUrl.concat(`/Chores/${chore.id}`), body, {headers})
  }

  removeChore(id: number) : Observable<Chore> {
    const headers = { 'Content-Type':'application/json', 'Authorization':`Bearer ${this.token}` }
    return this.httpClient.delete<Chore>(this.apiUrl.concat(`/Chores/${id}`), {headers})
  }

  addChore(roomName: string, chore: AddChore) : Observable<Chore> {
    const headers = { 'Content-Type':'application/json', 'Authorization':`Bearer ${this.token}` }
    const body = {
      'name' : chore.name,
      'description' : chore.description,
      'status' : chore.status
    }
    return this.httpClient.post<Chore>(this.apiUrl.concat(`/Chores/${roomName}`), body, {headers})
  } 
}
