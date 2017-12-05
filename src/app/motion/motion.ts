export class Motion {
  rate: number;
  data: ImageData;
  timeStamp: Date;

  constructor(rate: number, data: ImageData, timeStamp: Date) {
    this.rate = rate;
    this.data = data;
    this.timeStamp = timeStamp;
  }
}
