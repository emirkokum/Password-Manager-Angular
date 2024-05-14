import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RecordComponent } from './components/record/record.component';
import { MainComponent } from './components/main/main.component';
import { RecordDetailComponent } from './components/record-detail/record-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent,RecordComponent,SidebarComponent,NavComponent,RouterOutlet,RecordDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Password-Manager';
}
