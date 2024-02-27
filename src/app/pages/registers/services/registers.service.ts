import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entities } from '../../../models/Entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistersService {
  private apiUrl = 'http://localhost:8080'
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
    })
  }

  constructor(private http: HttpClient) { }

  addEntity(entity: Entities) {
    return this.http.post(this.apiUrl + '/entity', entity);
  }

  getEntities() {
    return this.http.get<Entities[]>(this.apiUrl + '/entity');
  }

  getListEntitiesScreenRegisters(page: number, size: number, isPerson?: boolean | null, name?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);
    if (isPerson === true || isPerson === false) {
      params = params.set('isPerson', isPerson);
    }
    if (name && name.trim()) {
      params = params.set('name', name);
    }
    return this.http.get(this.apiUrl + '/entity/registers', { params: params });
  }

  deleteEntity(id: number) {
    return this.http.delete(this.apiUrl + '/entity/' + id);
  }

  getEntityById(id: number) {
    return this.http.get<Entities>(this.apiUrl + '/entity/' + id);
  }

  updateEntity(entity: Entities) {
    return this.http.put(this.apiUrl + '/entity', entity);
  }


}
