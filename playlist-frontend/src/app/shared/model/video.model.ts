import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class Video{
  id: string;
  descricaoVideo: string;
  nomeCanal: string;
  dataCadastro: Date;
  dataViualizacao: Date;
  linkVideoExterno: string;
  urlSafe: SafeResourceUrl;
}