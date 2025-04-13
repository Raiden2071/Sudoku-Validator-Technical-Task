import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnInit, OnChanges {
  isRunning = input<boolean>(false);
  resetSignal = input<number>(0);

  seconds = signal<number>(0);

  private timerInterval: any;
  private previousRunningState = false;

  constructor() {
    effect(() => {
      const resetValue = this.resetSignal();
      if (resetValue > 0) {
        this.resetTimer();
      }
    });
  }

  ngOnInit(): void {
    this.previousRunningState = this.isRunning();
    this.startTimer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isRunning']) {
      const isRunningNow = this.isRunning();

      if (this.previousRunningState !== isRunningNow) {
        this.previousRunningState = isRunningNow;

        if (isRunningNow) {
          this.startTimer();
        } else {
          this.stopTimer();
        }
      }
    }
  }

  startTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    if (this.isRunning()) {
      this.timerInterval = setInterval(() => {
        this.seconds.update((prev) => prev + 1);
      }, 1000);
    }
  }

  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  resetTimer(): void {
    this.stopTimer();
    this.seconds.set(0);
    this.startTimer();
  }

  formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }
}
