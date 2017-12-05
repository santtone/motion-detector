import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MotionHandlerService} from '../motion/motion-handler.service';
import {Motion} from '../motion/motion';

declare var DiffCamEngine: any;

@Component({
  selector: 'md-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  captureSettings = {
    width: 340,
    height: 280,
    pixelDiffThreshold: 50, // default 32
    scoreThreshold: 16, // default 16
    interval: 100
  };

  showVideo: boolean;

  @ViewChild('video') videoElement: ElementRef;
  @ViewChild('motionCanvas') motionCanvasElement: ElementRef;

  constructor(private motionHandler: MotionHandlerService) {
    this.showVideo = false;
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    DiffCamEngine.init({
      video: this.videoElement.nativeElement,
      motionCanvas: this.motionCanvasElement.nativeElement,
      width: this.captureSettings.width,
      height: this.captureSettings.height,
      diffWidth: this.captureSettings.width,
      diffHeight: this.captureSettings.height,
      captureIntervalTime: this.captureSettings.interval,
      pixelDiffThreshold: this.captureSettings.pixelDiffThreshold,
      scoreThreshold: this.captureSettings.scoreThreshold,
      initSuccessCallback: this.onInitSuccess,
      initErrorCallback: this.onInitFail,
      captureCallback: (data) => {
        this.onCapture(data);
      }
    });
  }

  private onCapture(data) {
    if (data.hasMotion) {
      this.motionHandler.onMotionDetected(new Motion(data.score, data.imageData, new Date()));
    }
  }

  private onInitSuccess() {
    console.log('Cam initialized');
    DiffCamEngine.start();
  }

  private onInitFail() {
    console.log('Cam initialization failed');
  }


}

