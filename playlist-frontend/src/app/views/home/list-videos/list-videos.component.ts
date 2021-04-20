import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { ResponsePageable } from 'src/app/shared/model/responsePageable.model';
import { Video } from 'src/app/shared/model/video.model';
import { VideoService } from 'src/app/shared/service/video.service';
import { VideoFormUpdateDialogComponent } from '../video-form-update-dialog/video-form-update-dialog.component';
@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.css']
})
export class ListVideosComponent implements OnInit {

  videosAssistidos: Video[];
  videosNaoAssistidos: Video[];
  paginacaoResult: ResponsePageable = new ResponsePageable();
  controleCarregamentoVideosAssistidos: boolean = false;
  controleCarregamentoVideosNaoAssistidos: boolean = false;

  constructor(
    public videoService: VideoService,
    public sanitizer: DomSanitizer,
    public paginator: MatPaginatorIntl,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.iniciaConfiguracaoPaginacao();
    this.getVideos(false);
    this.getVideos(true);
  }

  public onChangePaginacao(event: PageEvent, videoAssitido: boolean): void {
    console.log(event);
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

  private iniciaConfiguracaoPaginacao(): void {
    this.paginator.itemsPerPageLabel = "Itens por página";
    this.paginator.nextPageLabel = "Próxima página";
    this.paginator.previousPageLabel = "Página anterior";
    this.paginator.firstPageLabel = "Primeira página";
    this.paginator.lastPageLabel = "Última página";
  }

  private controlePaginacaoVideos(dadosPaginacao: ResponsePageable, videoAssitido: boolean): void {
    if (dadosPaginacao != null){
      this.paginacaoResult = dadosPaginacao;

      if (videoAssitido){
        this.videosAssistidos = this.tratarRetornoPaginacao(dadosPaginacao.items);
        console.log(this.videosAssistidos);
      }        
      else {
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