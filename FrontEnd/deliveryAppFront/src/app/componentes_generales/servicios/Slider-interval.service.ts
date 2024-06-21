import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SliderIntervalService {

  private intervals: { [key: string]: number } = {};

  startInterval(intervalTime: number, callback: () => void, id: string): number {
    this.intervals[id] = window.setInterval(callback, intervalTime);
    return this.intervals[id];
  }

  stopInterval(id: string): void {
    if (this.intervals[id] !== undefined) {
      clearInterval(this.intervals[id]);
      delete this.intervals[id];
    }
  }
}
