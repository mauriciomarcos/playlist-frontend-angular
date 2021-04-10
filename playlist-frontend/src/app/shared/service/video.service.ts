import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsePageable } from '../model/responsePageable.model';
import { Video } from '../model/video.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  baseURL = 'https://localhost:44346/api/Video';

  buscaPaginado = '/buscarPaginado';
  criar = '/criar';
  buscarPorId = 'buscarPorId/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  public getVideosPagineted(flag: boolean): Observable<ResponsePageable>{
    console.log(this.baseURL + this.buscaPaginado + '?visualizado=' + flag);
    return this.httpClient.get<ResponsePageable>(this.baseURL + this.buscaPaginado + '?visualizado=' + flag)
  }

  public getById(id: string): Observable<ResponsePageable>{
    let endpoint = (this.baseURL + this.buscarPorId + id);

    console.log(endpoint);
    return this.httpClient.get<ResponsePageable>(endpoint)
  }

  public postVideo(video: Video): Observable<Video>{
    return this.httpClient.post<Video>(this.baseURL + this.criar, video, this.httpOptions);
  };
}