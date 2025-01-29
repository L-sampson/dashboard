import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { DonorsComponent } from './pages/donors/donors.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './services/auth/auth-guard.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'inventory',
        component: InventoryComponent,
        canActivate: [authGuard]
    },
    {
        path: 'donors',
        component: DonorsComponent
    }, 
    {
        path: '**',
        redirectTo: 'login'
    }
];
