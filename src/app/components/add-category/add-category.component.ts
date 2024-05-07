import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule,Validators,FormGroup } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {
  categories:Category[] = []
  categoryAddForm:FormGroup;

  constructor( private formBuilder: FormBuilder, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories()
    this.createCategoryAddForm()
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data
    })
  }

  createCategoryAddForm(){
    this.categoryAddForm = this.formBuilder.group({
      name:["",Validators.required]
    })
  }

  add(){
    if(this.categoryAddForm.valid){
      let categoryModel = Object.assign({},this.categoryAddForm.value) // Formdaki alanların karsiligini alir
      this.categoryService.add(categoryModel).subscribe(response => {
        console.log(response);
      },responseError => {
        console.log(responseError.error);
      })
    }else{
    }
  }



  
}
