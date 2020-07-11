import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from 'ng-apexcharts';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
}

@Component({
  selector: 'pelaguru-behavior-chart',
  templateUrl: './behavior-chart.component.html',
  styleUrls: ['./behavior-chart.component.scss']
})
export class BehaviorChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Shop views',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        },
        {
          name: 'Clicks for contact details',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148].reverse()
        }
      ],
      chart: {
        height: 300,
        type: 'line',
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      // title: {
      //   text: 'Product Trends by Month',
      //   align: 'left'
      // },
      grid: {
        row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep'
        ]
      }
    };
  }

  ngOnInit(): void {
    this.drawChart();
  }

  drawChart(): void {}
}
