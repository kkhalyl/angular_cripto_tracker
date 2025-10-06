import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { InvestmentListComponent } from './pages/investment-list/investment-list.component';
import { StepperComponent } from './components/stepper/stepper';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, InvestmentListComponent, MatToolbar, RouterOutlet, StepperComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('crypto-app');
}
