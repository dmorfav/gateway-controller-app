import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {Peripheral} from '../../interfaces/Peripheral';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {PeripheralService} from '../../services/peripheral.service';
import {v4 as uuidv4} from 'uuid';
import {CommonService, NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_SUCCESS} from '../../services/common.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formPeripheral: FormGroup;
  peripheral: Peripheral;
  peripheralList$: BehaviorSubject<Peripheral[]> = new BehaviorSubject<Peripheral[]>([]);
  today = new Date();
  constructor(
      @Inject(MAT_DIALOG_DATA) public anyVariable,
      private fb: FormBuilder,
      private common: CommonService,
      private matDialog: MatDialog,
      private peripheralService: PeripheralService
  ) {
    this.peripheral = anyVariable || {} as Peripheral;
    this.peripheralService.get().subscribe(res => this.peripheralList$.next(res));
  }

  ngOnInit(): void {
    this.formPeripheral = this.fb.group({
      uid: [this.peripheral?.uid || uuidv4()],
      vendor: [this.peripheral?.vendor, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      isOnline: [this.peripheral?.isOnline, Validators.compose([Validators.required])],
      dateCreated: [new Date(this.peripheral.dateCreated) || new Date(), Validators.compose([Validators.required])]
    })
  }

  cancel() {
    this.matDialog.closeAll();
  }

  async save() {
    try {
      this.formPeripheral.get('dateCreated').setValue(new Date(this.formPeripheral.get('dateCreated').value).setMilliseconds(0))
      if (this.peripheral._id) {
         await this.peripheralService.update(this.formPeripheral.value);
        this.common.showNotification('Success peripheral updated', '', NOTIFICATION_TYPE_SUCCESS);
      } else {
         await this.peripheralService.create(this.formPeripheral.value);
        this.common.showNotification('Success peripheral created', '', NOTIFICATION_TYPE_SUCCESS);
      }
      this.matDialog.closeAll();
      await this.peripheralService.load();
    } catch (e) {
      this.common.showNotification(e.error.message, 'Internal Error', NOTIFICATION_TYPE_ERROR);
    }
  }

}
