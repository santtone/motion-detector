import {Injectable} from '@angular/core';
import {Motion} from './motion';

@Injectable()
export class MotionHandlerService {

  desiredMotionRate: number;

  constructor() {
    this.desiredMotionRate = 1000;
  }

  onMotionDetected(motion: Motion) {
    if (motion.rate > this.desiredMotionRate) {
      console.log('AIzaSyBkJBHbQXLApclkDQzCNc1Q6wVEHYn8dQ8');
    }
  }

}
