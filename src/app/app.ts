import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentListComponent } from './components/investment-list/investment-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, InvestmentListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('crypto-app');
}
