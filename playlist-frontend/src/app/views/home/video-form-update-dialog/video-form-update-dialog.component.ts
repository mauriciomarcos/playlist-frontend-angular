import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Video } from 'src/app/shared/model/video.model';
import { VideoService } from 'src/app/shared/service/video.service';
import { MAT_MOMENT_DATE_FORMATS,  MomentDateAdapter,  MAT_MOMENT_DATE_ADAPTER_OPTIONS,} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { ConfimationDialogComponent } from 'src/app/shared/component/confimation-dialog/confimation-dialog.component';

@Component({
  selector: 'app-video-form-update-dialog',
  templateUrl: './video-form-update-dialog.component.html',
  styleUrls: ['./video-form-update-dialog.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class VideoFormUpdateDialogComponent implements OnInit {

  public videoForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public video: Video,
    private fb: FormBuilder,
    private videoService: VideoService,
    public dialogRef: MatDialogRef<VideoFormUpdateDialogComponent>,
    public dialogConfirmation: MatDialog
    ) { }
  
  ngOnInit(): void {
    this.carregarForm();
  }

  cancel(): void {
    this.dialogRef.close();
    this.videoForm.reset();
  }
  
  private carregarForm(): void{
    this.videoForm = this.fb.group({
      id: [this.video.id, [Validators.required]],
      descricaoVideo: [this.video.descricaoVideo, [Validators.required]],
      nomeCanal: [this.video.nomeCanal, [Validators.required]],
      dataCadastro: [this.video.dataCadastro, [Validators.required]],
      linkVideoExterno: [this.video.linkVideoExterno, [Validators.required]],
      visualizado: [this.video.visualizado]
    });
  }

  atualizarVideo(): void{
    let idVideo = this.video.id;

    this.videoService.putVideo(idVideo, this.videoForm.value).subscribe(result => {
      this.dialogRef.close();
      window.location.reload();
    });
  }

  deletarVideo(): void{
    let idVideo = this.video.id;

    const confirmation = this.dialogConfirmation.open(ConfimationDialogComponent);
    confirmation.afterClosed().subscribe(result => {
      console.log('Dialog result:' + result);
      
      if (result){
        this.videoService.delete(idVideo).subscribe(result => {
            console.log('Registro: ' + result.id + ' ' + result.nomeCanal + ' excluído.');
            this.dialogRef.close();
            window.location.reload();
         });
      }
    });    
  }
}