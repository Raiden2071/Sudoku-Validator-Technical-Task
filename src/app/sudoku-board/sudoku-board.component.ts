import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { SudokuGridComponent } from '../components/sudoku-grid/sudoku-grid.component';
import { SudokuControlsComponent } from '../components/sudoku-controls/sudoku-controls.component';
import { ValidationMessageComponent } from '../components/validation-message/validation-message.component';
import { TimerComponent } from '../components/timer/timer.component';
import { SudokuValidatorService } from '../services/sudoku-validator.service';
import { SudokuFormService } from '../services/sudoku-form.service';
import { VALIDATION_MESSAGES } from '../constants/messages.constants';
import { createEmptySudokuGrid } from '../utils/array-utils';
import { getRandomPuzzle } from '../utils/sudoku-puzzles';

@Component({
  selector: 'app-sudoku-board',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    SudokuGridComponent,
    SudokuControlsComponent,
    ValidationMessageComponent,
    TimerComponent
  ],
  templateUrl: './sudoku-board.component.html',
  styleUrl: './sudoku-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SudokuBoardComponent implements OnInit {
  sudokuForm!: FormGroup;
  
  grid = signal<(number | null)[][]>(createEmptySudokuGrid());
  invalidCells = signal<Set<string>>(new Set<string>());
  validationMessage = signal<string>('');
  formInitialized = signal<boolean>(false);
  timerRunning = signal<boolean>(true);
  timerResetCounter = signal<number>(0);
  
  private readonly validatorService = inject(SudokuValidatorService);
  private readonly formService = inject(SudokuFormService);
  private readonly destroyRef = inject(DestroyRef);
  
  ngOnInit(): void {
    this.initForm();
  }
  
  validateSudoku(): void {
    if (!this.formInitialized()) return;
    
    const currentGrid = this.grid();
    
    if (this.validatorService.isGridEmpty(currentGrid)) {
      this.validationMessage.set(VALIDATION_MESSAGES.EMPTY_GRID);
      this.invalidCells.set(new Set<string>());
      return;
    }
    
    const invalidCells = this.validatorService.validateGrid(currentGrid);
    this.invalidCells.set(invalidCells);
    
    if (invalidCells.size === 0) {
      this.validationMessage.set(VALIDATION_MESSAGES.VALID_GRID);
      this.timerRunning.set(false);
    } else {
      this.validationMessage.set(VALIDATION_MESSAGES.INVALID_GRID);
    }
  }
  
  resetGrid(): void {
    if (!this.formInitialized()) return;
    
    this.formService.resetForm(this.sudokuForm);
    this.grid.set(this.formService.createEmptyGrid());
    this.invalidCells.set(new Set<string>());
    this.validationMessage.set('');
    this.timerRunning.set(true);
    this.timerResetCounter.update(count => count + 1);
  }
  
  startNewGame(): void {
    if (!this.formInitialized()) return;
    
    const puzzle = getRandomPuzzle();
    this.formService.loadPuzzleIntoForm(this.sudokuForm, puzzle);
    this.grid.set(puzzle);
    this.invalidCells.set(new Set<string>());
    this.validationMessage.set('');
    this.timerRunning.set(true);
    this.timerResetCounter.update(count => count + 1);
  }
  
  isValidationSuccess(): boolean {
    return this.invalidCells().size === 0 && !!this.validationMessage();
  }
    
  private initForm(): void {
    this.sudokuForm = this.formService.createSudokuForm();
    
    this.sudokuForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.grid.set(value.rows);
      });
    
    this.formInitialized.set(true);
  }
}
