import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  imports: [MatCardModule, CommonModule],
  templateUrl: './results.html',
  styleUrl: './results.scss'
})

export class ResultsComponent implements OnInit{
  investmentCoin: string | null = null;
  investmentValue: number | null = null;
  investmentDate: Date | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParamMap;

    this.investmentCoin = queryParams.get('coin');
    
    const valueString = queryParams.get('value');
    if (valueString) {
      this.investmentValue = parseFloat(valueString);
    }

    const dateString = queryParams.get('date');
    if (dateString) {
      this.investmentDate = new Date(dateString);
    }

    console.log('Dados recebidos para o relatório:', this.investmentCoin, this.investmentValue, this.investmentDate);
  }

}
