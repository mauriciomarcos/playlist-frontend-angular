import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsePageable } from '../model/responsePageable.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  apiURL = 'http://localhost:59009​/api​/Video';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application-json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  public getVideos(): Observable<ResponsePageable>{
    return this.httpClient.get<ResponsePageable>(this.apiURL)
  }
}