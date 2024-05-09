import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordDetail } from '../../models/recordDetail';
import { RecordDetailService } from '../../services/recordDetail.service';
import { Record } from '../../models/record';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private recordDetailService:RecordDetailService,private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["categoryId"]){
        this.getRecordDetailsByCategoryId(params["categoryId"])
      }
      else{
        this.getRecordDetails()
        console.log(this.recordDetails);
        
      }
    })
  }

  getRecordDetails(){
    this.recordDetailService.getRecordDetails().subscribe(response => {
      this.recordDetails = response.data
    })
  }

  async getRecordDetailsByCategoryId(categoryId: number) {
    await this.recordDetailService.getRecordDetailsByCategoryId(categoryId).subscribe(response => {
      this.recordDetails = response.data
    })
  }
}
