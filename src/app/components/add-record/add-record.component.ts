import { Component, OnInit, Output } from '@angular/core';
import { RecordService } from '../../services/record.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-record',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-record.component.html',
  styleUrl: './add-record.component.css'
})
export class AddRecordComponent implements OnInit {
  recordAddForm: FormGroup;
  categories: Category[] = []
  constructor(private categoryService: CategoryService, private toastr: ToastrService, private recordService: RecordService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCategories()
    this.createRecordAddForm()
  }

  // @Output() recordAdded = new EventEmitter<any>();


  createRecordAddForm() {
    this.recordAddForm = this.formBuilder.group({
      title: ["", Validators.required],
      categoryId: [""],
      userName: [""],
      password: [""],
      url: [""],
      notes: [""]
    })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data
    })
  }

  refreshPage() {
    this.createRecordAddForm()
    this.getCategories()
  }


  add() {
    if (this.recordAddForm.valid) {
      let recordModel = Object.assign({}, this.recordAddForm.value)
      this.recordService.add(recordModel).subscribe(response => {
        this.refreshPage()
        // this.recordAdded.emit(recordModel.title);
        // window.location.reload();
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





}
