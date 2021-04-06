import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from 'src/app/shared/model/video.model';
import { VideoService } from 'src/app/shared/service/video.service';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.css']
})
export class ListVideosComponent implements OnInit {

  videosAssistidos: Video[];
  videosNaoAssistidos: Video[];

  constructor(
    public videoService: VideoService,
    public sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.getVideosAssistidos()
    this.getVideosNaoAssistidos();
  }

  getVideosAssistidos(){
    this.videoService.getVideosPagineted(true).subscribe(dadosRetorno => {
      if (dadosRetorno != null){
        this.videosAssistidos = dadosRetorno.result.items;
        console.log(this.videosAssistidos);

        this.videosAssistidos.forEach(video => {
          video.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(video.linkVideoExterno);
        });
      }
    });
  }

  getVideosNaoAssistidos(){
    this.videoService.getVideosPagineted(false).subscribe(dadosRetorno => {
      if (dadosRetorno != null){
        this.videosNaoAssistidos = dadosRetorno.result.items;
        console.log(this.videosNaoAssistidos);

        this.videosNaoAssistidos.forEach(video => {
          video.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(video.linkVideoExterno);
        })
      }      
    });
  }
}