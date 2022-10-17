import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Gateway} from '../../interfaces/Gateway';
import {v4 as uuidv4} from 'uuid';
import {PeripheralService} from '../../services/peripheral.service';
import {Peripheral} from '../../interfaces/Peripheral';
import {GatewayService} from '../../services/gateway.service';
import {BehaviorSubject, map, Observable, startWith} from 'rxjs';
import {CommonService, NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_SUCCESS} from '../../services/common.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';

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
    separatorKeysCodes: number[] = [ENTER, COMMA];
    peripheralCtrl = new FormControl('');
    filteredPeripherals: Observable<string[]>;
    peripherals: string[] = [];
    allPeripherals: string[] = [];

    @ViewChild('peripheralInput') peripheralInput: ElementRef<HTMLInputElement>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public anyVariable,
        private fb: FormBuilder,
        private matDialog: MatDialog,
        private common: CommonService,
        private gatewayService: GatewayService,
        private peripheralService: PeripheralService
    ) {
        this.gateway = anyVariable || {peripheral: []} as Gateway;
        this.peripherals = this.gateway?.peripheral?.map(value => {
            return value.toString();
        });
        this.peripheralService.get().subscribe(async res => {
            this.allPeripherals = res.map(value => {
                return value?.uid;
            });
        });
        this.filteredPeripherals = this.peripheralCtrl.valueChanges.pipe(
            startWith(null),
            map((peripheral: string | null) => (peripheral ? this._filter(peripheral) : this.allPeripherals.slice())),
        );
    }

    ngOnInit(): void {
        this.formGateway = this.fb.group({
            uid: [this.gateway?.uid || uuidv4()],
            name: [this.gateway?.name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
            ipv4: [this.gateway?.ipv4, Validators.compose([Validators.required, Validators.pattern(rxIPv4)])],
            peripheral: [this.peripherals]
        })
    }

    cancel() {
        this.matDialog.closeAll();
    }

    async save() {
        try {
            console.log(this.formGateway.get('peripheral').value);
            if (this.gateway._id) {
                await this.gatewayService.update(this.formGateway.value)
                this.common.showNotification('Success gateway updated', '', NOTIFICATION_TYPE_SUCCESS);
            } else {
                if (this.formGateway.get('peripheral').value === null) {
                    this.formGateway.get('peripheral').setValue([]);
                }
                await this.gatewayService.create(this.formGateway.value);
                this.common.showNotification('Success gateway created', '', NOTIFICATION_TYPE_SUCCESS);
            }
            this.matDialog.closeAll();
            await this.gatewayService.load();
        } catch (e) {
            this.common.showNotification(e.error.message, 'Internal Error', NOTIFICATION_TYPE_ERROR);
        }
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (value) {
            this.peripherals.push(value);
            this.formGateway.get('peripheral').setValue(this.peripherals);
        }

        // Clear the input value
        event.chipInput!.clear();

        this.peripheralCtrl.setValue(null);
    }

    remove(peripheral: string): void {
        const index = this.peripherals.indexOf(peripheral);

        if (index >= 0) {
            this.peripherals.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.peripherals.push(event.option.viewValue);
        this.peripheralInput.nativeElement.value = '';
        this.peripheralCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.allPeripherals.filter(peripheral => peripheral.toLowerCase().includes(filterValue));
    }

}
