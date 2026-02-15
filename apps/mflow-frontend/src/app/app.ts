import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast, ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Toast],
  providers: [ToastModule, MessageService],
  templateUrl: './app.template.html',
})
export class App {
  protected readonly title = signal('mflow-frontend');
}
