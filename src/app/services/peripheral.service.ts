import {Injectable} from '@angular/core';
import {Peripheral} from '../interfaces/Peripheral';
import {BehaviorSubject, Observable} from 'rxjs';
import {PeripheralResService} from '../repos/peripheral-res.service';
import {Status} from '../interfaces/Status';

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

    async detail(id: string): Promise<Peripheral> {
        return await this.peripheralRes.get(id);
    }

    async delete(id: string): Promise<Status> {
        return await this.peripheralRes.delete(id);
    }

    async create(peripheral: Peripheral): Promise<Peripheral> {
        return await this.peripheralRes.create(peripheral);
    }

    async update(peripheral: Peripheral): Promise<Peripheral> {
        return await this.peripheralRes.update(peripheral);
    }

}
