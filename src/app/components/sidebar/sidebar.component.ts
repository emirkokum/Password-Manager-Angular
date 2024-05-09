import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { RecordService } from '../../services/record.service';
import { Record } from '../../models/record';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  categories: Category[] = []
  records: Record[] = []

  constructor(private categoryService: CategoryService, private recordService: RecordService) { }

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

  




}
