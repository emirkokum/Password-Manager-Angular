import { Component } from '@angular/core';
import { RecordComponent } from '../record/record.component';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RecordComponent,CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
