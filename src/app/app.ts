import { Component, signal, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { StepperComponent } from './components/stepper/stepper';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatToolbar, RouterOutlet, StepperComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('crypto-app');
  showStepper = signal(true);

  constructor(private router: Router, private ngZone: NgZone) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((navEvent: NavigationEnd) => {
      this.ngZone.run(() => {
        if (navEvent.urlAfterRedirects.includes('/results')) {
          this.showStepper.set(false);
        }
        else {
          this.showStepper.set(true);
        }
      });
    });
  }
}
