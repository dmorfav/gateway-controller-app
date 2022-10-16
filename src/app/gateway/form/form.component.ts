import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Gateway} from '../../interfaces/Gateway';
import {v4 as uuidv4} from 'uuid';
import {PeripheralService} from '../../services/peripheral.service';
import {Peripheral} from '../../interfaces/Peripheral';
import {GatewayService} from '../../services/gateway.service';
import {BehaviorSubject} from 'rxjs';

const rxIPv4 = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    formGateway: FormGroup;
    gateway: Gateway;
    peripheralList$: BehaviorSubject<Peripheral[]> = new BehaviorSubject<Peripheral[]>([]);

    constructor(
        @Inject(MAT_DIALOG_DATA) public anyVariable,
        private fb: FormBuilder,
        private matDialog: MatDialog,
        private gatewayService: GatewayService,
        private peripheralService: PeripheralService
    ) {
        this.gateway = anyVariable || {} as Gateway;
        this.peripheralService.get().subscribe(res => this.peripheralList$.next(res));
    }

    ngOnInit(): void {
        this.formGateway = this.fb.group({
            uid: [this.gateway?.uid || uuidv4()],
            name: [this.gateway?.name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
            ipv4: [this.gateway?.ipv4, Validators.compose([Validators.required, Validators.pattern(rxIPv4)])],
            peripheral: [this.gateway.peripheral]
        })
    }

    cancel() {
        this.matDialog.closeAll();
    }

    async save() {
        try {
            let resp;
            if (this.gateway._id) {
                console.log(this.gateway);
                resp = await this.gatewayService.update(this.formGateway.value)
            } else {
                if (this.formGateway.get('peripheral').value === null) {
                    this.formGateway.get('peripheral').setValue([]);
                }
                resp = await this.gatewayService.create(this.formGateway.value);
            }
            console.log(resp);
            this.matDialog.closeAll();
            await this.gatewayService.load();
        } catch (e) {

        }
    }

}
