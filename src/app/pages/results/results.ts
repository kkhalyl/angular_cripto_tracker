import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CryptoService } from '/workspaces/angular_cripto_tracker/src/app/services/crypto';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables, ChartConfiguration, ChartType } from 'chart.js';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [MatCardModule, CommonModule, BaseChartDirective],
  templateUrl: './results.html',
  styleUrl: './results.scss'
})

export class ResultsComponent implements OnInit{
  investmentCoin: string | null = null;
  investmentValue: number | null = null;
  investmentDate: Date | null = null;
  coinValuethen: number | null = null;
  coinValueNow: number | null = null;
  investmentNow: number | null = null;
  investmentPercentage: number | null = null;
  investmentROI: number | null = null;
  @ViewChild(BaseChartDirective) public chart: BaseChartDirective | undefined;

  public lineChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Performance',
      fill: true,
      tension: 0.4,
      borderColor: '#7e8cff',
      backgroundColor: 'rgba(126, 140, 255, 0.2)'
    }]
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0 
      } 
    },
    scales: {
      x: {
        type: 'timeseries', // Define o tipo como escala de tempo
        time: {
          unit: 'hour', // Diz ao gráfico para mostrar rótulos por hora
          tooltipFormat: 'dd/MM/yy HH:mm', // Formato no tooltip
          displayFormats: {
            hour: 'HH:mm' // Formato no eixo X (ex: 15:00)
          }
        },
        ticks: { color: '#9aaccd' },
        grid: { color: 'rgba(154, 172, 205, 0.1)' }
      },
      y: {
        ticks: { color: '#9aaccd' },
        grid: { color: 'rgba(154, 172, 205, 0.1)' }
      }
    },
    plugins: { legend: { display: false } }
  };
  public lineChartType: ChartType = 'line';

  constructor(private route: ActivatedRoute, private cryptoService: CryptoService) { 
    Chart.register(...registerables);
  }

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

    if (this.investmentCoin && this.investmentDate) {
      const fromDate = this.investmentDate;
      const toDate = new Date();

      this.cryptoService.getMarketChartDataRange(this.investmentCoin, fromDate, toDate)
  .subscribe(chartData => {
    const prices = chartData.prices;
    if (!prices?.length) return;

    this.coinValuethen = prices[0][1];
    this.coinValueNow = prices.at(-1)[1];

    const diffDays = (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);

    // Define intervalo e unidade do eixo X
    let intervalH = 1;
    let unit: 'hour' | 'day' | 'month' = 'hour';
    if (diffDays < 1)       { intervalH = 4; unit = 'hour'; }
    else if (diffDays < 30) { intervalH = 24 * 5; unit = 'day'; }
    else                    { intervalH = 24 * 30 * 2; unit = 'month'; }

    // Filtra dados
    const first = prices[0][0];
    const filtered = prices.filter((p: [number, number]) => ((p[0] - first) / 36e5) % intervalH < 1);

    // Mapeia para {x, y}
    this.lineChartData.datasets[0].data = filtered.map((p: [number, number]) => ({ x: p[0], y: p[1] }));
        // Atualiza a escala
        this.lineChartOptions = {
      ...(this.lineChartOptions || {}),
      scales: {
        ...((this.lineChartOptions?.scales as any) || {}),
        x: {
          type: 'timeseries',
          time: {
            unit,
            tooltipFormat: 'dd/MM/yy HH:mm',
            displayFormats: { hour: 'HH:mm', day: 'dd/MM', month: 'MM/yy' }
          },
          ticks: { color: '#9aaccd' },
          grid: { color: 'rgba(154, 172, 205, 0.1)' }
        }
      }
    };
    this.chart?.update();


    this.calculateResults();
    this.chart?.update();
  });
      }

  }
  calculateResults(): void{
    if (this.investmentValue && this.coinValueNow && this.coinValuethen) {
      this.investmentNow = (this.investmentValue/this.coinValuethen)*this.coinValueNow;
      this.investmentROI = this.investmentNow - this.investmentValue;
      this.investmentPercentage = (this.investmentROI/this.investmentValue) * 100;
    }
  }
}