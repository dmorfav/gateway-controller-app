import {Injectable} from '@angular/core';
import {GatewayResService} from '../repos/gateway-res.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Gateway} from '../interfaces/Gateway';
import {Status} from '../interfaces/Status';

@Injectable({
    providedIn: 'root'
})
export class GatewayService {

    private gatewayList$: BehaviorSubject<Gateway[]> = new BehaviorSubject<Gateway[]>([]);

    constructor(private gatewayRes: GatewayResService) {}

    get(): Observable<Gateway[]> {
        this.load().then();
        return this.gatewayList$.asObservable();
    }

    async load(): Promise<void> {
        this.gatewayList$.next(await this.gatewayRes.get());
    }

    async detail(id: string): Promise<Gateway> {
        return await this.gatewayRes.get(id);
    }

    async delete(id: string): Promise<Status> {
        return await this.gatewayRes.delete(id);
    }

    async create(gateway: Gateway): Promise<Gateway> {
        return await this.gatewayRes.create(gateway);
    }

    async update(gateway: Gateway): Promise<Gateway> {
        return await this.gatewayRes.update(gateway);
    }
}
