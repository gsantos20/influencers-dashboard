import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  constructor() {}
  /** Based on the screen size, switch from standard to one column per row */


  ngAfterViewInit(){
    this.createPieChart();
    this.createAreaChart()
  }

  createAreaChart(): void {
    const myLineChart = new Chart("myAreaChart", {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Earnings",
          tension: 0.3,
          backgroundColor: "rgba(78, 115, 223, 0.05)",
          borderColor: "rgba(78, 115, 223, 1)",
          pointRadius: 3,
          pointBackgroundColor: "rgba(78, 115, 223, 1)",
          pointBorderColor: "rgba(78, 115, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
          pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          pointHitRadius: 10,
          borderWidth: 2,
          data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
        }],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 7,
              font: {
                family: 'Poppins', // Set your font family here
                size: 12 // Set font size here
              }
            },
          },
          y: {
            ticks: {
              maxTicksLimit: 5,
              padding: 10,
              font: {
                family: 'Poppins', // Set your font family here
                size: 12 // Set font size here
              },
              callback: (value: any) => '$' + this.numberFormat(value),
            },
            grid: {
              color: "rgb(234, 236, 244)"
            },
          },
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: "rgb(255, 255, 255)",
            bodyColor: "#858796",
            titleFont: {
              size: 14,
            },
            yAlign: "center",
            xAlign: "center",
            borderColor: '#dddfeb',
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            intersect: false,
            mode: 'index',
            caretPadding: 10,
            callbacks: {
              label: (context: any) => {
                let label = context.dataset.label || '';
                label += ': $' + this.numberFormat(context.parsed.y);
                return label;
              },
            },
          },
        },
      },
    });
  }

  numberFormat(number: number): string {
    number = parseFloat(number.toFixed(2));
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }


  createPieChart(): void {
    const myPieChart = new Chart("myPieChart", {
      type: 'doughnut',
      data: {
        labels: ["Direct", "Referral", "Social"],
        datasets: [{
          data: [55, 30, 15],
          backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
          hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      },
      options: {
        maintainAspectRatio: false,
        plugins:{
          filler: {
            propagate: false
          },
          tooltip: {
            backgroundColor: "rgb(255,255,255)",
            bodyColor: "#858796",
            titleColor: "#858796",
            borderColor: '#dddfeb',
            bodyAlign: "center",
            padding: 10,
            borderWidth: 1,
            displayColors: false,
            caretPadding: 10
          },
          legend: {
            display: false
          }
        },
        cutout: 120
      }
    });
  }
}
