import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { DonorsComponent } from './pages/donors/donors.component';
import { LoginComponent } from './pages/login/login.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
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
        path: '',
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'inventory',
                component: InventoryComponent,
            },
            {
                path: 'donors',
                component: DonorsComponent
            },
            {
                path: '**',
                component: UnauthorizedComponent
            }
        ]
    }, 
    {
        path: '**',
        redirectTo: 'login'
    }
];
