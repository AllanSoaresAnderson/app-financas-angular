import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Earnings } from '../entities/earnings';
import { Expenses } from '../entities/expenses';
import { Entities } from '../entities/entities';

@Injectable({
  providedIn: 'root'
})
export class DataService {
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

  /*Earnings*/

  getListEarnings(): Observable<any>{
    return this.http.get<Earnings[]>(`${this.apiUrl}/earnings/listEarnings`)
  }

  addEarning(earning: Earnings): Observable<any>{
    return this.http.post<Earnings>(`${this.apiUrl}/earnings/addEarning`, earning, this.httpOptions)
  }

  deleteEarningById(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/earnings/delEarning/${id}`, { observe: 'response' })
  }

  updateEarning(id:number, earning:Earnings):Observable<any>{
    return this.http.put(`${this.apiUrl}/earnings/updateEarning/${id}`, earning, { observe: 'response' })
  }

  /*END >>> Earnings*/

  /*Entities*/

  getListEntities(): Observable<any>{
    return this.http.get<Entities[]>(`${this.apiUrl}/entities/listEntities`)
  }

  addEntities(entity: Entities): Observable<any>{
    return this.http.post<Entities>(`${this.apiUrl}/entities/addEntity`, entity, this.httpOptions)
  }

  deleteEntityById(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/entities/delEntity/${id}`, { observe: 'response' })
  }

  updateEntity(id:number, entity:Entities):Observable<any>{
    return this.http.put(`${this.apiUrl}/entities/updateEntity/${id}`, entity, { observe: 'response' })
  }


  /*END >>> Entities*/
  

  /*Expenses*/

  getListExpenses(): Observable<any>{
    return this.http.get<Expenses[]>(`${this.apiUrl}/expenses/listExpenses`)
  }

  addExpense(expense: Expenses): Observable<any>{
    return this.http.post<Expenses>(`${this.apiUrl}/expenses/addExpense`, expense, this.httpOptions)
  }

  deleteExpenseById(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/expenses/delExpense/${id}`, { observe: 'response' })
  }

  updateExpense(id:number, expense:Expenses):Observable<any>{
    return this.http.put(`${this.apiUrl}/expenses/updateExpense/${id}`, expense, { observe: 'response' })
  }

  /*END >>> Expenses*/

}
