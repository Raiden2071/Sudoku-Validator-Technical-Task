import { ChangeDetectionStrategy, Component, output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sudoku-controls',
  imports: [CommonModule],
  templateUrl: './sudoku-controls.component.html',
  styleUrl: './sudoku-controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SudokuControlsComponent {
  check = output<void>();
  reset = output<void>();
  newGame = output<void>();
  
  onCheck(): void {
    this.check.emit();
  }
  
  onReset(): void {
    this.reset.emit();
  }
  
  onNewGame(): void {
    this.newGame.emit();
  }
} 