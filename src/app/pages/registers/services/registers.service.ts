import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entities } from '../../../models/Entities';
import { Observable } from 'rxjs';
import { Transactions } from '../../../models/Transactions';

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

  /*START Entities*/

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

  /*END Entities*/


  /*Start Transactions*/
  getListTransactionsScreenRegisters(page: number, size: number, name?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);
    if (name && name.trim()) {
      params = params.set('name', name);
    }
    return this.http.get<any>(this.apiUrl + '/transactions/registers', { params: params });
  }

  getTransactionById(id: number) {
    return this.http.get<Transactions>(this.apiUrl + '/transactions/' + id);
  }

  deleteTransaction(id:number){
    return this.http.delete(this.apiUrl + '/transactions/' + id);
  }

  addTransaction(transaction: Transactions){
    return this.http.post(this.apiUrl + '/transactions', transaction);
  }



  /*END Transactions*/



}
