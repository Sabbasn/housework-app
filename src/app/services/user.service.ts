import { HttpClient } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Service } from 'src/models/auth/service.model';
import { AddChore } from 'src/models/housework/addChore.model';
import { Chore } from 'src/models/housework/chore.model';
import { Room } from 'src/models/housework/room.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _httpClient: HttpClient = inject(HttpClient)
  _cookie: CookieService = inject(CookieService)

  apiUrl: string = isDevMode() ? "https://localhost:7076/api/":"https://houseworkapi.azurewebsites.net/api/";
  token = this._cookie.get('token')
  headers = { 'Content-Type':'application/json', 'Authorization':`Bearer ${this.token}` }

  getUserData(email: string) {
    const headers = this.headers
    localStorage.setItem("email", email)
    return this._httpClient.get(this.apiUrl.concat(`Users/${email}`), {headers})
  }

  getRooms() : Observable<Room[]> {
    const headers = this.headers
    return this._httpClient.get<Room[]>(this.apiUrl.concat(`Rooms`), {headers})
  }

  addRoom(room: Room) : Observable<Room> {
    const headers = this.headers
    const body = {
      'name' : room.name,
    }
    return this._httpClient.post<Room>(this.apiUrl.concat(`Rooms`), body, {headers})
  }

  updateRoom(room: Room) : Observable<Room> {
    const headers = this.headers
    const body = {
      'name' : room.name,
      'status' : room.status,
      'orderPriority' : room.orderPriority,
      'color' : room.color,
      'image' : room.image,
    }
    return this._httpClient.put<Room>(this.apiUrl.concat(`Rooms/${room.id}`), body, {headers})
  }

  deleteRoom(roomId: number) : Observable<Room> {
    const headers = this.headers
    return this._httpClient.delete<Room>(this.apiUrl.concat(`Rooms/${roomId}`), {headers})
  }

  getChores(roomId: number) : Observable<Chore[]> {
    const headers = this.headers
    return this._httpClient.get<Chore[]>(this.apiUrl.concat(`Chores/${roomId}`), {headers})
  }

  getScheduledChores(roomId: number) : Observable<Chore[]> {
    const headers = this.headers
    return this._httpClient.get<Chore[]>(this.apiUrl.concat(`Chores/Scheduled/${roomId}`), {headers})
  }

  updateChore(chore: Chore) : Observable<Service<Chore>> {
    const headers = this.headers
    const body = {
      'status': chore.status,
      'orderPriority': chore.orderPriority,
      'name': chore.name,
      'description': chore.description,
      'repeatWeekdays': chore.repeatWeekdays,
    }
    return this._httpClient.put<Service<Chore>>(this.apiUrl.concat(`Chores/${chore.id}`), body, {headers})
  }

  removeChore(id: number) : Observable<Chore> {
    const headers = this.headers
    return this._httpClient.delete<Chore>(this.apiUrl.concat(`Chores/${id}`), {headers})
  }

  addChore(roomId: number, chore: AddChore) : Observable<Chore> {
    const headers = this.headers
    const body = {
      'name' : chore.name,
      'description' : chore.description,
      'status' : chore.status,
    }
    return this._httpClient.post<Chore>(this.apiUrl.concat(`Chores/${roomId}`), body, {headers})
  } 
}
