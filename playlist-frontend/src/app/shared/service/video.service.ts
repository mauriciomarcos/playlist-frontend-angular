import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsePageable } from '../model/responsePageable.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  apiURL = 'https://localhost:44346/api/Video/buscarPaginado';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application-json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  public getVideosPagineted(flag: boolean): Observable<ResponsePageable>{
    console.log(this.apiURL + '?visualizado=' + flag);
    return this.httpClient.get<ResponsePageable>(this.apiURL + '?visualizado=' + flag)
  }
}