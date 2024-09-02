import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast-message',
  template: `
    <div class="toast-message" *ngIf="show">
      {{ message }}
    </div>
  `,
  styles: [`
    .toast-message {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #ffbe9878;
      color: #fff;
      padding: 10px 20px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      transition: opacity 0.3s;
    }
  `]
})
export class ToastMessageComponent {
  @Input() message: string = '';
  @Input() show: boolean = false;
}
