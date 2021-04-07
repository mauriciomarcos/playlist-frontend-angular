import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { VideoService } from 'src/app/shared/service/video.service';

@Component({
  selector: 'app-video-form-dialog',
  templateUrl: './video-form-dialog.component.html',
  styleUrls: ['./video-form-dialog.component.css']
})
export class VideoFormDialogComponent implements OnInit {
  
  public videoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private videoService: VideoService,
    public dialogRef: MatDialogRef<VideoFormDialogComponent>
  ) { }

  ngOnInit(): void {
    this.videoForm = this.fb.group({
      descricaoVideo: ['', [Validators.required]],
      nomeCanal: ['', [Validators.required]],
      //dataCadastro: ['', [Validators.required]],
      linkVideoExterno: ['', [Validators.required]]
    });
  }

  criarVideo(){
      this.videoService.postVideo(this.videoForm.value).subscribe(result => {});
      this.cancel();
      this.videoForm.reset();
  }

  cancel(): void {
    this.dialogRef.close();
    this.videoForm.reset();
  }
}