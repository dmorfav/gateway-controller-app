import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import {PeripehralComponent} from '../../peripehral/peripehral.component';
import {GatewayComponent} from '../../gateway/gateway.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'peripheral',     component: PeripehralComponent },
    { path: 'gateway',     component: GatewayComponent },
];
