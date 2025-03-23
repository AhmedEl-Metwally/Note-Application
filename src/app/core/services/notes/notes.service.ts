import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotesService
{

  private readonly _httpClient = inject(HttpClient)


  constructor() { }


  addNote(data:object): Observable<any>
  {
    return this._httpClient.post(`${environment.noteUrl}`,data)
  }

  getUserNotes(): Observable<any>
  {
    return this._httpClient.get(`${environment.noteUrl}`)
  }

  updateNote(id: string, data: object): Observable<any>
  {
    return this._httpClient.put(`${environment.noteUrl}${id}`,data)
  }

  deleteNote(id: string): Observable<any>
  {
    return this._httpClient.delete(`${environment.noteUrl}${id}`)
  }

}
