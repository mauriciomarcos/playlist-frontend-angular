import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { VideoService } from 'src/app/shared/service/video.service';
import { MAT_MOMENT_DATE_FORMATS,  MomentDateAdapter,  MAT_MOMENT_DATE_ADAPTER_OPTIONS,} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Categoria } from 'src/app/shared/model/categoria.model';
import { CategoriaService } from 'src/app/shared/service/categoria.service';

@Component({
  selector: 'app-video-formCreate-dialog',
  templateUrl: './video-formCreate-dialog.component.html',
  styleUrls: ['./video-formCreate-dialog.component.css'],
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
export class VideoFormCreateDialogComponent implements OnInit {
  
  public videoForm: FormGroup;
  public categorias: Categoria[];

  constructor(
    private fb: FormBuilder,
    private videoService: VideoService,
    private categoriaService: CategoriaService,
    public dialogRef: MatDialogRef<VideoFormCreateDialogComponent>
  ) 
  { }

  ngOnInit(): void {
    this.carregarForm();
    this.getCategorias();
  }

  public criarVideo(): void{   
    this.videoService.postVideo(this.videoForm.value).subscribe(result => {
      this.dialogRef.close();
      window.location.reload();
    });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.videoForm.reset();
  }

  private getCategorias(): void {
    this.categoriaService.getAll().subscribe(response => {
      if (response != null)
        this.categorias = response;
    })
  }

  private carregarForm(){
    this.videoForm = this.fb.group({
      id: [null],
      descricaoVideo: ['', [Validators.required]],
      nomeCanal: ['', [Validators.required]],
      dataCadastro: ['', [Validators.required]],
      linkVideoExterno: ['', [Validators.required]],
      categoriaId: ['', [Validators.required]]
    });
  }
}