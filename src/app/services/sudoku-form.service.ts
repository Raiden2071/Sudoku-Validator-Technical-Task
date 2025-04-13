import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { createEmptySudokuGrid, createSudokuVector } from '../utils/array-utils';

@Injectable({
  providedIn: 'root'
})
export class SudokuFormService {
  private readonly fb = inject(FormBuilder);
  
  createSudokuForm(): FormGroup {
    return this.fb.group({
      rows: this.fb.array(
        createSudokuVector(9, null).map(() => 
          this.fb.array(
            createSudokuVector(9, null).map(() => 
              this.fb.control(null, [Validators.min(1), Validators.max(9)])
            )
          )
        )
      )
    });
  }
  
  getRowsArray(form: FormGroup): FormArray {
    return form.get('rows') as FormArray;
  }
  
  resetForm(form: FormGroup): void {
    form.reset();
  }
  
  createEmptyGrid(): (number | null)[][] {
    return createEmptySudokuGrid();
  }
} 