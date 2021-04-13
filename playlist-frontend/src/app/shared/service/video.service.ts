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

  criar = '/criar';
  atualizar = '/atualizar/'
  buscaPaginado = '/buscarPaginado';
  buscarPorId = '/buscarPorId/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  public getVideosPagineted(flag: boolean): Observable<ResponsePageable>{
    let endpoint = (this.baseURL + this.buscaPaginado + '?visualizado=' + flag);
    
    console.log(endpoint);
    return this.httpClient.get<ResponsePageable>(endpoint)
  }

  public getById(id: string): Observable<ResponsePageable>{
    let endpoint = (this.baseURL + this.buscarPorId + id);

    console.log(endpoint);
    return this.httpClient.get<ResponsePageable>(endpoint)
  }

  public postVideo(video: Video): Observable<Video>{
    let endpoint = this.baseURL + this.criar
    return this.httpClient.post<Video>(endpoint, video, this.httpOptions);
  };

  public putVideo(id: string, video: Video): Observable<Video>{
    let endpoint = this.baseURL + this.atualizar + id
    return this.httpClient.put<Video>(endpoint, video, this.httpOptions);
  };
}