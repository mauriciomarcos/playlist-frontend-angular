import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Video } from 'src/app/shared/model/video.model';
import { VideoService } from 'src/app/shared/service/video.service';

@Component({
  selector: 'app-video-form-update-dialog',
  templateUrl: './video-form-update-dialog.component.html',
  styleUrls: ['./video-form-update-dialog.component.css']
})
export class VideoFormUpdateDialogComponent implements OnInit {

  public videoForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public video: Video,
    private fb: FormBuilder,
    private videoService: VideoService,
    public dialogRef: MatDialogRef<VideoFormUpdateDialogComponent>
    ) { }
  
  ngOnInit(): void {
    this.carregarForm();
  }

  private carregarForm(): void{
    this.videoForm = this.fb.group({
      id: [this.video.id, [Validators.required]],
      descricaoVideo: [this.video.descricaoVideo, [Validators.required]],
      nomeCanal: [this.video.nomeCanal, [Validators.required]],
      dataCadastro: [this.video.dataCadastro, [Validators.required]],
      linkVideoExterno: [this.video.linkVideoExterno, [Validators.required]]
    });
  }
}