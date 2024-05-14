import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { RecordService } from '../../services/record.service';
import { Record } from '../../models/record';
import { RouterModule } from '@angular/router';
import { RecordDetailComponent } from '../record-detail/record-detail.component';
import { RecordDetailService } from '../../services/recordDetail.service';
import { RecordDetail } from '../../models/recordDetail';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule,RecordDetailComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  categories: Category[] = []
  records: Record[] = []  
  recordDetail:any
  record:any

  constructor(private categoryService: CategoryService, private recordService: RecordService,private recordDetailService:RecordDetailService) { }

  ngOnInit(): void {
    this.getCategories()
    this.getRecords()
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data
    })
  }

  getRecords(){
    this.recordService.getRecords().subscribe(response =>{
      this.records = response.data
    })
  }

  setRecordDetail(id:number){
    // this.recordDetailService.getRecordDetailsById(id).subscribe(response =>{
    //   this.recordDetail= response.data            
    // })
    this.recordService.getRecordById(id).subscribe(response => {
      this.record = response.data
    })
  }


  




}
