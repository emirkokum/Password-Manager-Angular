import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RecordComponent } from './components/record/record.component';
import { RecordDetailComponent } from './components/record-detail/record-detail.component';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AgGridAngular,AgGridModule,RecordComponent,SidebarComponent,NavComponent,RouterOutlet,RecordDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Password-Manager';
}
