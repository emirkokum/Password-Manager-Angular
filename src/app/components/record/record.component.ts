import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordDetail } from '../../models/recordDetail';
import { RecordDetailService } from '../../services/recordDetail.service';
import { Record } from '../../models/record';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './record.component.html',
  styleUrl: './record.component.css'
})
export class RecordComponent implements OnInit {
  recordDetails: RecordDetail[] = [];
  records:Record[] = []
  constructor(private recordDetailService:RecordDetailService){}

  ngOnInit(): void {
    this.getRecordDetails()
  }

  getRecordDetails(){
    this.recordDetailService.getRecordDetails().subscribe(response => {
      this.recordDetails = response.data
    })
  }
}
