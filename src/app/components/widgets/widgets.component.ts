import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-widgets',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './widgets.component.html',
  styleUrl: './widgets.component.scss'
})
export class WidgetsComponent {
  @Input() header!: string;
  @Input() icon!: string;
  @Input() stats: number | null = null;
  @Input() title!: string;
}

// topWidgets: TopWidgets[] = [
//     {header: 'Donor Partners', icon: 'handshake', stats: this.orgCount, title: 'Companies'},
//     {header: 'Contacts', icon: 'groups', stats: 39, title: 'Contacts'},
//     {header: 'Donations', icon: 'pallet', stats: 2, title: 'Donations Recieved'},
//     {header: 'CODD Letters', icon: 'mail', stats: 3, title: 'Letters Sent'}
//   ]
