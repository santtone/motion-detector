import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {VideoComponent} from './video/video.component';
import {MotionHandlerService} from './motion/motion-handler.service';


@NgModule({
  declarations: [
    AppComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MotionHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
