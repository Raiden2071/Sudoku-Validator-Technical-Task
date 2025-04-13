import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validation-message',
  imports: [CommonModule],
  templateUrl: './validation-message.component.html',
  styleUrl: './validation-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationMessageComponent {
  message = input<string>('');
  isSuccess = input<boolean>(false);
} 