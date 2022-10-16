import {Injectable} from '@angular/core';
import {Peripheral} from '../interfaces/Peripheral';
import {BehaviorSubject, Observable} from 'rxjs';
import {Gateway} from '../interfaces/Gateway';
import {PeripheralResService} from '../repos/peripheral-res.service';

@Injectable({
    providedIn: 'root'
})
export class PeripheralService {

    private peripheralList$: BehaviorSubject<Peripheral[]> = new BehaviorSubject<Peripheral[]>([]);

    constructor(private peripheralRes: PeripheralResService) {
    }

    get(): Observable<Peripheral[]> {
        this.load().then();
        return this.peripheralList$.asObservable();
    }

    async load(): Promise<void> {
        this.peripheralList$.next(await this.peripheralRes.get());
    }

}
