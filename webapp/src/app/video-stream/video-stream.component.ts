import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {environment} from '../../environments/environment';

@Component({
  selector: 'md-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.scss']
})
export class VideoStreamComponent implements OnInit {

  videoUrl: string;
  settingsOpened: boolean;
  zoomLevel: number;

  @ViewChild('settingsSidenav') settingsSidenav: MatSidenav;

  constructor() {
    this.videoUrl = environment.videoUrl;
    this.settingsOpened = false;
    this.zoomLevel = 1;
  }

  ngOnInit() {
  }

  toggleSettings() {
    this.settingsSidenav.toggle();
    this.settingsOpened = !this.settingsOpened;
  }

}
