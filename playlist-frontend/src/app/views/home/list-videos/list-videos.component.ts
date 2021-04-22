import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { DomSanitizer } from '@angular/platform-browser';
import { Categoria } from 'src/app/shared/model/categoria.model';
import { ResponsePageable } from 'src/app/shared/model/responsePageable.model';
import { Video } from 'src/app/shared/model/video.model';
import { CategoriaService } from 'src/app/shared/service/categoria.service';
import { VideoService } from 'src/app/shared/service/video.service';
import { VideoFormUpdateDialogComponent } from '../video-form-update-dialog/video-form-update-dialog.component';
@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.css']
})
export class ListVideosComponent implements OnInit {

  public videosAssistidos: Video[];
  public videosNaoAssistidos: Video[];
  public categorias: Categoria[];
  public paginacaoResultVisualizados: ResponsePageable = new ResponsePageable();
  public paginacaoResultNaoVisualizados: ResponsePageable = new ResponsePageable();
  public controleCarregamentoVideosAssistidos: boolean = false;
  public controleCarregamentoVideosNaoAssistidos: boolean = false;

  constructor(
    private videoService: VideoService,
    private categoriaService: CategoriaService,
    private sanitizer: DomSanitizer,
    private paginator: MatPaginatorIntl,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.iniciaConfiguracaoPaginacao();
    this.getVideos(false);
    this.getVideos(true);
    this.getCategorias();
  }

  public selectChange(event: MatSelect): void{
    console.log(event.id);
    console.log(event.value);
   
  }

  public onChangePaginacao(event: PageEvent, videoAssitido: boolean): void {
    this.videoService.getVideosPagineted((event.pageIndex + 1), event.pageSize, videoAssitido).subscribe(retorno => {
      this.controlePaginacaoVideos(retorno, videoAssitido);
    });
  }

  public updateVideo(video: Video): void {
    this.dialog.open(VideoFormUpdateDialogComponent, {
      minWidth: '400px',
      data: video
    });
  }

  private getVideos(videoAssistido: boolean): void {
    this.videoService.getVideosPagineted(null, null, videoAssistido).subscribe(dadosRetorno => {      
      this.controlePaginacaoVideos(dadosRetorno, videoAssistido);
    });
  }

  private getCategorias(): void {
    this.categoriaService.getAll().subscribe(response => {
      if (response != null){
        this.categorias = response;
      }        
      console.log(this.categorias);
    });    
  }

  private iniciaConfiguracaoPaginacao(): void {
    this.paginator.itemsPerPageLabel = "Itens por página";
    this.paginator.nextPageLabel = "Próxima página";
    this.paginator.previousPageLabel = "Página anterior";
    this.paginator.firstPageLabel = "Primeira página";
    this.paginator.lastPageLabel = "Última página";
  }

  private controlePaginacaoVideos(dadosPaginacao: ResponsePageable, videoAssitido: boolean): void {
    if (dadosPaginacao != null){
      if (videoAssitido){
        this.paginacaoResultVisualizados = dadosPaginacao;
        this.videosAssistidos = this.tratarRetornoPaginacao(dadosPaginacao.items);
        console.log(this.videosAssistidos);
      }        
      else {
        this.paginacaoResultNaoVisualizados = dadosPaginacao;
        this.videosNaoAssistidos = this.tratarRetornoPaginacao(dadosPaginacao.items);
        console.log(this.videosNaoAssistidos);
      } 
    }   

    this.controlarCarregamentoVideo(videoAssitido);
  }

  private tratarRetornoPaginacao(videos: Video[]): Video[]{
    videos.forEach(video => {
      video.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(video.linkVideoExterno);
    }); 
    return videos;
  }

  private controlarCarregamentoVideo(videoAssitido: boolean): void {
    if (videoAssitido)
      this.controleCarregamentoVideosAssistidos = true;
    else
      this.controleCarregamentoVideosNaoAssistidos = true;
  }
}