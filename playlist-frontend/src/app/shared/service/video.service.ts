import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsePageable } from '../model/responsePageable.model';
import { Video } from '../model/video.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseURL = 'https://localhost:44346/api/Video';
  private criar = '/criar';
  private atualizar = '/atualizar/';
  private excluir = '/excluir/'
  private buscaPaginado = '/buscarPaginado';
  private buscarPorId = '/buscarPorId';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
    ) { }

  public getVideosPagineted(pageNumber: any, pageSize: any, visualizado: boolean): Observable<ResponsePageable>{    
    let endpoint = `${this.baseURL}${this.buscaPaginado}?visualizado=${visualizado}`;

    if (pageNumber != null && pageSize != null)
      endpoint = `${this.baseURL}${this.buscaPaginado}/${pageNumber}/${pageSize}?visualizado=${visualizado}`;
    else if (pageNumber != null)
      endpoint = `${this.baseURL}${this.buscaPaginado}/${pageNumber}?visualizado=${visualizado}`;

    console.log(endpoint);
    return this.httpClient.get<ResponsePageable>(endpoint, this.httpOptions)
  }

  public getById(id: string): Observable<Video>{
    let endpoint = (this.baseURL + this.buscarPorId + id);

    console.log(endpoint);
    return this.httpClient.get<Video>(endpoint, this.httpOptions)
  }

  public postVideo(video: Video): Observable<Video>{
    let endpoint = (this.baseURL + this.criar);
    return this.httpClient.post<Video>(endpoint, video, this.httpOptions);
  };

  public putVideo(id: string, video: Video): Observable<Video>{
    let endpoint = (this.baseURL + this.atualizar + id);
    return this.httpClient.put<Video>(endpoint, video, this.httpOptions);
  };

  public delete(id: string): Observable<Video>{
    let endpoint = (this.baseURL + this.excluir + id);
    return this.httpClient.delete<Video>(endpoint, this.httpOptions);
  }
}