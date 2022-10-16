import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {environment} from '../../environments/environment';
import {Peripheral} from '../interfaces/Peripheral';

@Injectable({
  providedIn: 'root'
})
export class PeripheralResService {

  constructor(private http: HttpClient) {
  }

  async get(id?: string): Promise<any> {
    const params = id ? {id} : {};
    return lastValueFrom(this.http.get(`${environment.apiURL}/peripheral`, {params: params}));
  }

  async delete(id?: string): Promise<any> {
    return lastValueFrom(this.http.delete(`${environment.apiURL}/peripheral/delete`, {params: {id}}));
  }

  async create(peripheral: Peripheral): Promise<any> {
    return lastValueFrom(this.http.post(`${environment.apiURL}/peripheral/create`, peripheral));
  }

  async update(peripheral: Peripheral): Promise<any> {
    return lastValueFrom(this.http.put(`${environment.apiURL}/peripheral/update`, peripheral, {params: {id: peripheral.uid}}));
  }

}
