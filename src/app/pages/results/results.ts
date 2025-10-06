import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  imports: [],
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
