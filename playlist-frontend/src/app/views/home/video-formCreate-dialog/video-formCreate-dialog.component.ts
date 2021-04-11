import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { VideoService } from 'src/app/shared/service/video.service';

@Component({
  selector: 'app-video-formCreate-dialog',
  templateUrl: './video-formCreate-dialog.component.html',
  styleUrls: ['./video-formCreate-dialog.component.css']
})
export class VideoFormCreateDialogComponent implements OnInit {
  
  public videoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private videoService: VideoService,
    public dialogRef: MatDialogRef<VideoFormCreateDialogComponent>
  ) 
  { }

  ngOnInit(): void {
    this.carregarForm();
  }

  criarVideo(){
    this.videoService.postVideo(this.videoForm.value).subscribe(result => {
      this.dialogRef.close();
      window.location.reload();
    });
  }

  cancel(): void {
    this.dialogRef.close();
    this.videoForm.reset();
  }

  private carregarForm(){
    this.videoForm = this.fb.group({
      id: [null],
      descricaoVideo: ['', [Validators.required]],
      nomeCanal: ['', [Validators.required]],
      dataCadastro: ['', [Validators.required]],
      linkVideoExterno: ['', [Validators.required]]
    });
  }
}