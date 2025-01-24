import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

export type MenuItems = {
  icon: string,
  label: string,
  route?: string
}

@Component({
  selector: 'app-custom-sidenav',
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss'
})
export class CustomSidenavComponent {

  sidenavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sidenavCollapsed.set(val);
  }

  menuItems = signal<MenuItems[]>([
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    {icon: 'volunteer_activism', label: 'Donors', route: '/donors'},
    { icon: 'inventory', label: 'Inventory', route: '/inventory' },
    { icon: 'location_city', label: 'Workshops', route: '/workshops' },
    { icon: 'support_agent', label: 'Requests', route: '/request'},
    { icon: 'summarize', label: 'Reports', route: '/reports'},
    { icon: 'logout', label: 'Logout', route: '/logout'}
  ]);

  profilePicSize = computed(() => this.sidenavCollapsed() ? '32' : '100');
}
