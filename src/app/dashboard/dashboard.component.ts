import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import {GatewayService} from '../services/gateway.service';
import {PeripheralService} from '../services/peripheral.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

    lastUpdateGateway: Date
    lastUpdatePeripheral: Date
    gatewayQuantity: number;
    peripheralQuantity: number;
    subscriptionList: Array<Subscription> = new Array<Subscription>();

    constructor(public gatewayService: GatewayService, public peripheralService: PeripheralService) {
        this.loadData();
        this.subscriptionList.push(this.gatewayService.get().subscribe(res => this.gatewayQuantity = res.length));
        this.subscriptionList.push(this.peripheralService.get().subscribe(res => this.peripheralQuantity = res.length));
    }

    ngOnDestroy(): void {
        this.subscriptionList.forEach(subscription => subscription.unsubscribe());
    }

    /*startAnimationForLineChart(chart){
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        chart.on('draw', function(data) {
          if(data.type === 'line' || data.type === 'area') {
            data.element.animate({
              d: {
                begin: 600,
                dur: 700,
                from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeOutQuint
              }
            });
          } else if(data.type === 'point') {
                seq++;
                data.element.animate({
                  opacity: {
                    begin: seq * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'ease'
                  }
                });
            }
        });

        seq = 0;
    };
    startAnimationForBarChart(chart){
        let seq2: any, delays2: any, durations2: any;

        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function(data) {
          if(data.type === 'bar'){
              seq2++;
              data.element.animate({
                opacity: {
                  begin: seq2 * delays2,
                  dur: durations2,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
        });

        seq2 = 0;
    };*/
    ngOnInit() {
        setTimeout(() => {
            this.loadData();
        }, 5000);
    }

    loadData(): void {
        this.lastUpdateGateway = undefined;
        this.lastUpdatePeripheral = undefined;
        this.gatewayService.load().then(() => {
            this.lastUpdateGateway = new Date();
        });
        this.peripheralService.load().then(() => {
            this.lastUpdatePeripheral = new Date();
        });
    }

}
