import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import {GatewayComponent} from '../../gateway/gateway.component';
import {PeripheralComponent} from '../../peripheral/peripheral.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'peripheral',     component: PeripheralComponent },
    { path: 'gateway',     component: GatewayComponent },
];
