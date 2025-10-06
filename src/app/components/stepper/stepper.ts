import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './stepper.html',
  styleUrls: ['./stepper.scss']
})
export class StepperComponent implements OnInit {

  currentStep: number = 1;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;

      if (url.includes('/purchase-date')) {
        this.currentStep = 3;
      } else if (url.includes('/purchase')) {
        this.currentStep = 2;
      } else if (url.includes('/results')) {
        this.currentStep = 4;
      } else {
        this.currentStep = 1;
      }
    });
  }
}