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

