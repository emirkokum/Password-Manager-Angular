import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { RecordDetailService } from '../../services/recordDetail.service';
import { RecordDetail } from '../../models/recordDetail';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  categories: Category[] = []
  recordsByCategoryId:RecordDetail[] = []

  constructor(private categoryService: CategoryService, private recordService: RecordDetailService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data
    })
  }

  getRecordDetailsByCategoryId(categoryId:number){
    this.recordService.getRecordDetailsByCategoryId(categoryId).subscribe(response=>{
      this.recordsByCategoryId = response.data   
      console.log(this.recordsByCategoryId);
    })
  }




}
