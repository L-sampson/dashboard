import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import {MatSidenavModule} from '@angular/material/sidenav'
import { CustomSidenavComponent } from "./components/custom-sidenav/custom-sidenav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, CustomSidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Inspiredu';

  collapsed = signal(false);

  sidenavWidth =  computed(() => this.collapsed() ? '65px' : '250px');
}
