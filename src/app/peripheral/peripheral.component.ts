import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Gateway} from '../interfaces/Gateway';
import {MatDialog} from '@angular/material/dialog';
import {CommonService, NOTIFICATION_TYPE_ERROR} from '../services/common.service';
import {Peripheral} from '../interfaces/Peripheral';
import {PeripheralService} from '../services/peripheral.service';
import {FormComponent} from './form/form.component';

@Component({
    selector: 'app-peripheral',
    templateUrl: './peripheral.component.html',
    styleUrls: ['./peripheral.component.scss']
})
export class PeripheralComponent implements OnInit {

    peripheralList$: BehaviorSubject<Peripheral[]>;

    constructor(
        private peripheralService: PeripheralService,
        private matDialog: MatDialog,
        private common: CommonService) {
        this.peripheralList$ = new BehaviorSubject<Peripheral[]>([]);
    }

    async ngOnInit(): Promise<void> {
        await this.peripheralService.get().subscribe(res => this.peripheralList$.next(res));
    }

    async form(peripheral?: Peripheral) {
        this.matDialog.open(FormComponent, {
            'width': '6000px',
            'maxHeight': '90vh',
            'data': peripheral,
            'autoFocus': false
        })
    }

    async delete(peripheralId: string) {
        if (confirm('Are you sure to delete this peripheral ')) {
            try {
                const resp = await this.peripheralService.delete(peripheralId)
                if (resp.status) {
                    await this.peripheralService.load();
                    this.common.showNotification('Success deleted peripheral')
                }
            } catch (e) {
                this.common.showNotification('We have a internal error', '', NOTIFICATION_TYPE_ERROR)
            }
        }
    }


}
