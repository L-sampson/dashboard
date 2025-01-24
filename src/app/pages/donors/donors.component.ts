import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TopWidgets } from '../../interfaces/widgets';


@Component({
  selector: 'app-donors',
  imports: [MatButtonModule, MatIconModule, MatCardModule, CommonModule],
  templateUrl: './donors.component.html',
  styleUrl: './donors.component.scss'
})
export class DonorsComponent {


  topWidgets: TopWidgets[] = [
    {header: 'Donor Partners', icon: 'handshake', stats: 61, title: 'Companies'},
    {header: 'Contacts', icon: 'groups', stats: 39, title: 'Contacts'},
    {header: 'Donations', icon: 'pallet', stats: 2, title: 'Donations Recieved'},
    {header: 'CODD Letters', icon: 'mail', stats: 3, title: 'Letters Sent'}
  ]
}
