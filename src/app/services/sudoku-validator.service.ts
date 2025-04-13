import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SudokuValidatorService {
  validateGrid(grid: (number | null)[][]): Set<string> {
    const invalidCells = new Set<string>();
    
    if (this.isGridEmpty(grid)) {
      return invalidCells;
    }
    
    for (let row = 0; row < 9; row++) {
      if (!this.isRowValid(grid, row)) {
        this.markInvalidRow(invalidCells, grid, row);
      }
    }
    
    for (let col = 0; col < 9; col++) {
      if (!this.isColumnValid(grid, col)) {
        this.markInvalidColumn(invalidCells, grid, col);
      }
    }
    
    for (let box = 0; box < 9; box++) {
      if (!this.isSubgridValid(grid, Math.floor(box / 3) * 3, (box % 3) * 3)) {
        this.markInvalidSubgrid(invalidCells, grid, Math.floor(box / 3) * 3, (box % 3) * 3);
      }
    }
    
    return invalidCells;
  }
  
  isGridEmpty(grid: (number | null)[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] !== null) return false;
      }
    }
    return true;
  }
  
  private isRowValid(grid: (number | null)[][], row: number): boolean {
    const seen = new Set<number>();
    for (let col = 0; col < 9; col++) {
      const num = grid[row][col];
      if (num !== null) {
        if (seen.has(num)) return false;
        seen.add(num);
      }
    }
    return true;
  }
  
  private isColumnValid(grid: (number | null)[][], col: number): boolean {
    const seen = new Set<number>();
    for (let row = 0; row < 9; row++) {
      const num = grid[row][col];
      if (num !== null) {
        if (seen.has(num)) return false;
        seen.add(num);
      }
    }
    return true;
  }
  
  private isSubgridValid(grid: (number | null)[][], startRow: number, startCol: number): boolean {
    const seen = new Set<number>();
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const num = grid[startRow + row][startCol + col];
        if (num !== null) {
          if (seen.has(num)) return false;
          seen.add(num);
        }
      }
    }
    return true;
  }
  
  private markInvalidRow(invalidCells: Set<string>, grid: (number | null)[][], row: number): void {
    const seen = new Map<number, number[]>();
    
    for (let col = 0; col < 9; col++) {
      const num = grid[row][col];
      if (num !== null) {
        if (!seen.has(num)) {
          seen.set(num, []);
        }
        seen.get(num)?.push(col);
      }
    }
    
    for (const [num, positions] of seen.entries()) {
      if (positions.length > 1) {
        for (const col of positions) {
          invalidCells.add(`${row}-${col}`);
        }
      }
    }
  }
  
  private markInvalidColumn(invalidCells: Set<string>, grid: (number | null)[][], col: number): void {
    const seen = new Map<number, number[]>();
    
    for (let row = 0; row < 9; row++) {
      const num = grid[row][col];
      if (num !== null) {
        if (!seen.has(num)) {
          seen.set(num, []);
        }
        seen.get(num)?.push(row);
      }
    }
    
    for (const [num, positions] of seen.entries()) {
      if (positions.length > 1) {
        for (const row of positions) {
          invalidCells.add(`${row}-${col}`);
        }
      }
    }
  }
  
  private markInvalidSubgrid(invalidCells: Set<string>, grid: (number | null)[][], startRow: number, startCol: number): void {
    const seen = new Map<number, Array<[number, number]>>();
    
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const actualRow = startRow + row;
        const actualCol = startCol + col;
        const num = grid[actualRow][actualCol];
        
        if (num !== null) {
          if (!seen.has(num)) {
            seen.set(num, []);
          }
          seen.get(num)?.push([actualRow, actualCol]);
        }
      }
    }
    
    for (const [num, positions] of seen.entries()) {
      if (positions.length > 1) {
        for (const [row, col] of positions) {
          invalidCells.add(`${row}-${col}`);
        }
      }
    }
  }
} 