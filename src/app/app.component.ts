import { Component } from '@angular/core';
import { SudokuBoardComponent } from './sudoku-board/sudoku-board.component';

@Component({
  selector: 'app-root',
  imports: [SudokuBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sudoku-validator';
}
