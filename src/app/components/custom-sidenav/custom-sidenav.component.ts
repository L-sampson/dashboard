import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth/authservice.service';

export type MenuItems = {
  icon: string,
  label: string,
  route?: string,
  action?: () => void;
}

@Component({
  selector: 'app-custom-sidenav',
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss'
})
export class CustomSidenavComponent {
  constructor(private authService: AuthService,
    private router: Router) {}

  sidenavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sidenavCollapsed.set(val);
  }

  username = localStorage.getItem('user');
  role = localStorage.getItem('role');

  menuItems = signal<MenuItems[]>([
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'volunteer_activism', label: 'Donors', route: '/donors' },
    { icon: 'inventory', label: 'Inventory', route: '/inventory' },
    { icon: 'location_city', label: 'Workshops', route: '/workshops' },
    { icon: 'support_agent', label: 'Requests', route: '/request'},
    { icon: 'summarize', label: 'Reports', route: '/reports'},
    { icon: 'logout', label: 'Logout', action: () => this.logout() }
  ]);

  profilePicSize = computed(() => this.sidenavCollapsed() ? '32' : '100');

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
