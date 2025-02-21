import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" *ngIf="isOpen" (click)="onCancel()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
        <div class="modal-actions">
          <button class="btn-secondary" (click)="onCancel()">Cancel</button>
          <button class="btn-danger" (click)="onConfirm()">{{ confirmButtonText }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      min-width: 300px;
      max-width: 500px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

      h3 {
        margin: 0 0 15px 0;
        color: #333;
      }

      p {
        margin: 0 0 20px 0;
        color: #666;
      }
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;

      button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;

        &.btn-secondary {
          background-color: #6c757d;
          color: white;

          &:hover {
            background-color: #5a6268;
          }
        }

        &.btn-danger {
          background-color: #dc3545;
          color: white;

          &:hover {
            background-color: #c82333;
          }
        }
      }
    }
  `]
})
export class ConfirmationModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed?';
  @Input() confirmButtonText = 'Confirm';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
} 