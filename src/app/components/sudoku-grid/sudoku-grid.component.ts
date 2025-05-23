import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SudokuFormService } from '../../services/sudoku-form.service';

@Component({
  selector: 'app-sudoku-grid',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sudoku-grid.component.html',
  styleUrl: './sudoku-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SudokuGridComponent {
  sudokuForm = input.required<FormGroup>();
  invalidCells = input<Set<string>>(new Set<string>());
  
  protected Math = Math;
  
  private readonly formService = inject(SudokuFormService);

  get rows(): FormArray | null {
    if (!this.sudokuForm()) return null;
    return this.formService.getRowsArray(this.sudokuForm());
  }

  getRowsControls(): AbstractControl[] {
    const rows = this.rows;
    return rows ? rows.controls : [];
  }
  
  getRowControls(rowGroup: AbstractControl): AbstractControl[] {
    return rowGroup ? (rowGroup as FormArray).controls : [];
  }
  
  isCellInvalid(row: number, col: number): boolean {
    const key = `${row}-${col}`;
    return this.invalidCells() && this.invalidCells().has(key);
  }
} 