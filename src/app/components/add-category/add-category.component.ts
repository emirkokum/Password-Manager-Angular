import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { RecordService } from '../../services/record.service';
import { Record } from '../../models/record';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { RecordDeleteDialogComponent } from '../record-delete-dialog/record-delete-dialog.component';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [RecordDeleteDialogComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {
  categories: Category[] = []
  categoryAddForm: FormGroup;
  records: Record[] = []

  constructor(public dialog: MatDialog, private toastr: ToastrService, private formBuilder: FormBuilder, private categoryService: CategoryService, private recordService: RecordService) { }

  ngOnInit(): void {
    this.getRecords()
    this.getCategories()
    this.createCategoryAddForm()
  }

  getRecords() {
    this.recordService.getRecords().subscribe(response => {
      this.records = response.data
    })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data
    })
  }

  refreshPage() {
    this.createCategoryAddForm()
    this.getCategories()
    this.getRecords()
  }

  createCategoryAddForm() {
    this.categoryAddForm = this.formBuilder.group({
      name: ["", Validators.required]
    })
  }

  ifThereIsRecordInThisCategory(categoryId: number): boolean {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.records[i].categoryId == categoryId) {
        return true;
      } return false;
    }
    return false;
  }

  addCategory() {
    if (this.categoryAddForm.valid) {
      let categoryModel = Object.assign({}, this.categoryAddForm.value) // Formdaki alanların karsiligini alir
      this.categoryService.add(categoryModel).subscribe(response => {
        this.refreshPage()
        this.toastr.success(response.message, "Success")
      }, responseError => {
        if (responseError.error?.Errors?.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastr.error(responseError.error.Errors[i].ErrorMessage, "Validation Error")
          }
        }
      })
    } else {
      this.toastr.error("Your inputs are not valid", "Not Valid")
    }
  }

  deleteCategory(category: Category) {
    if (this.ifThereIsRecordInThisCategory(category.id)) {
      this.toastr.error("There are records with this category you can't delete it.", "Can't Delete")
    } else {
      this.categoryService.delete(category).subscribe(response => {
        this.toastr.success(response.message, "Deleted")
        this.refreshPage()
      })
    }
  }

  // async deleteCategory(category:Category) {
  //   const result = await this.openDialog().afterClosed().toPromise();
  //   if (!result) {
  //     return;
  //   } else {
  //     try {
  //       this.categoryService.delete(category).subscribe(
  //         response => {
  //           this.toastr.success(response.message, "Success");
  //         },
  //         responseError => {
  //           if (responseError.error?.Errors?.length > 0) {
  //             for (let i = 0; i < responseError.error.Errors.length; i++) {
  //               this.toastr.error(responseError.error.Errors[i].ErrorMessage, "Validation Error");
  //             }
  //           }
  //         }
  //       );
  //     } catch (error) {
  //       console.error("An error occurred while deleting the record:", error);
  //     }
  //   }
  // }

  // openDialog() {
  //   return this.dialog.open(RecordDeleteDialogComponent, {
  //     width: '550px',
  //     panelClass: 'matdialog-delete'
  //   });
  // }





}
