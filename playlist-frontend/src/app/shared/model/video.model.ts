import { SafeResourceUrl } from '@angular/platform-browser';
import { Categoria } from './categoria.model';

export class Video{
  id: string;
  descricaoVideo: string;
  nomeCanal: string;
  dataCadastro: Date;
  dataViualizacao: Date;
  linkVideoExterno: string;
  urlSafe: SafeResourceUrl;
  visualizado: boolean;
  categoriaId: string;
  nomeCategoria: string; 
}