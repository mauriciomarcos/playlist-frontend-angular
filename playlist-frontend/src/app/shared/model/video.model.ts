import { SafeResourceUrl } from '@angular/platform-browser';

export class Video{
  id: string;
  descricaoVideo: string;
  nomeCanal: string;
  dataCadastro: Date;
  dataViualizacao: Date;
  linkVideoExterno: string;
  urlSafe: SafeResourceUrl;
}