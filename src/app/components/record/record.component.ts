import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordDetail } from '../../models/recordDetail';
import { RecordDetailService } from '../../services/recordDetail.service';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './record.component.html',
  styleUrl: './record.component.css'
})
export class RecordComponent implements OnInit {
  recordDetails: RecordDetail[] = [];

  constructor(private recordDetailService:RecordDetailService){}

  ngOnInit(): void {
    this.getRecordDetails()
  }

  getRecordDetails(){
    this.recordDetailService.getRecordDetails().subscribe(response => {
      this.recordDetails = response.data
      console.log(this.recordDetails);
    })
  }
}
