import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {lastValueFrom} from 'rxjs';
import {Gateway} from '../interfaces/Gateway';

@Injectable({
    providedIn: 'root'
})
export class GatewayResService {

    constructor(private http: HttpClient) {
    }

    async get(id?: string): Promise<any> {
        const params = id ? {id} : {};
        return lastValueFrom(this.http.get(`${environment.apiURL}/gateway`, {params: params}));
    }

    async delete(id?: string): Promise<any> {
        return lastValueFrom(this.http.delete(`${environment.apiURL}/gateway/delete`, {params: {id}}));
    }

    async deletePeripheral(gatewayId: string, peripheralId: string): Promise<any> {
        return lastValueFrom(this.http.delete(`${environment.apiURL}/gateway/delete/peripheral`, {
            params: {
                peripheral_id: peripheralId,
                gateway_id: gatewayId
            }
        }));
    }

    async create(gateway: Gateway): Promise<any> {
        return lastValueFrom(this.http.post(`${environment.apiURL}/gateway/create`, gateway));
    }

    async update(gateway: Gateway): Promise<any> {
        return lastValueFrom(this.http.put(`${environment.apiURL}/gateway/update`, gateway, {params: {id: gateway.uid}}));
    }

}
