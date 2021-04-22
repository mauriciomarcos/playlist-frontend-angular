import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private baseURL = 'https://localhost:5001/api/Categoria';
  private buscarTodos = '/buscarTodos'
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAll(): Observable<Categoria[]>{
    let endpoint = `${this.baseURL}${this.buscarTodos}`
    return this.httpClient.get<Categoria[]>(endpoint, this.httpOptions);
  }
}