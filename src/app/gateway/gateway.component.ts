import {Component, OnInit} from '@angular/core';
import {GatewayService} from '../services/gateway.service';
import {BehaviorSubject} from 'rxjs';
import {Gateway} from '../interfaces/Gateway';
import {CommonService, NOTIFICATION_TYPE_ERROR} from '../services/common.service';
import {MatDialog} from '@angular/material/dialog';
import {FormComponent} from './form/form.component';

@Component({
    selector: 'app-gateway',
    templateUrl: './gateway.component.html',
    styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent implements OnInit {

    gatewayList$: BehaviorSubject<Gateway[]>;

    constructor(
        private gatewayService: GatewayService,
        private matDialog: MatDialog,
        private common: CommonService) {
        this.gatewayList$ = new BehaviorSubject<Gateway[]>([]);
    }

    async ngOnInit(): Promise<void> {
        await this.gatewayService.get().subscribe(res => this.gatewayList$.next(res));
    }

    async form(gateway?: Gateway) {
        this.matDialog.open(FormComponent, {
            'width': '6000px',
            'maxHeight': '90vh',
            'data': gateway,
            'autoFocus': false
        })
    }

    async delete(gatewayId: string) {
        if (confirm('Are you sure to delete this gateway ')) {
            try {
                const resp = await this.gatewayService.delete(gatewayId)
                if (resp.status) {
                    await this.gatewayService.load();
                    this.common.showNotification('Success deleted gateway')
                }
            } catch (e) {
                this.common.showNotification('We have a internal error', '', NOTIFICATION_TYPE_ERROR)
            }
        }
    }

}
