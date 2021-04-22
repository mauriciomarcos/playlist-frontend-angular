import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VideoFormCreateDialogComponent } from './video-formCreate-dialog/video-formCreate-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addVideo(): void {
    this.dialog.open(VideoFormCreateDialogComponent, {
      minWidth: '400px'
    });
  }
}