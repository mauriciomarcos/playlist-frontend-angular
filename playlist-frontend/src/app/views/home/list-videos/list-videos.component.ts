import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { Result } from 'src/app/shared/model/result.model';
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
  paginacaoResult: Result = new Result();

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
    this.getVideosAssistidos()
    this.getVideosNaoAssistidos();
  }

  getVideosAssistidos(){
    this.videoService.getVideosPagineted(true).subscribe(dadosRetorno => {
      if (dadosRetorno != null){
        this.paginacaoResult = dadosRetorno.result;
        this.videosAssistidos = dadosRetorno.result.items;

        console.log(this.videosAssistidos);

        this.videosAssistidos.forEach(video => {
          video.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(video.linkVideoExterno);
        });        
      }
      this.controleCarregamentoVideosAssistidos = true;
    });
  }

  getVideosNaoAssistidos(){
    this.videoService.getVideosPagineted(false).subscribe(dadosRetorno => {
      if (dadosRetorno != null){
        this.paginacaoResult = dadosRetorno.result;
        this.videosNaoAssistidos = dadosRetorno.result.items;

        console.log(this.videosNaoAssistidos);

        this.videosNaoAssistidos.forEach(video => {
          video.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(video.linkVideoExterno);
        })
      }      
      this.controleCarregamentoVideosNaoAssistidos = true;
    });
  }

  updateVideo(video: Video): void {
    this.dialog.open(VideoFormUpdateDialogComponent, {
      minWidth: '400px',
      data: video
    });
  }

  iniciaConfiguracaoPaginacao(){
    this.paginator.itemsPerPageLabel = "Itens por página";
    this.paginator.nextPageLabel = "Próxima página";
    this.paginator.previousPageLabel = "Página anterior";
    this.paginator.firstPageLabel = "Primeira página";
    this.paginator.lastPageLabel = "Última página";
  }
}