import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Record } from '../../models/record';
import { RecordService } from '../../services/record.service';


@Component({
  selector: 'app-record-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './record-detail.component.html',
  styleUrl: './record-detail.component.css'
})
export class RecordDetailComponent {

  @Input() set record(value: Record) {
    if (!value) return
    this.createRecordUpdateForm(value);
  }

  showPassword: boolean = false;
  recordUpdateForm: FormGroup;
  categories: Category[] = []

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private recordService: RecordService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getCategories()
  }

  createRecordUpdateForm(value: any) {
    this.recordUpdateForm = this.formBuilder.group({
      id: [value.id],
      categoryId: [value.categoryId],
      title: [value.title],
      userName: [value.username],
      password: [value.password],
      url: [value.url],
      notes: [value.notes]
    })
  }


  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data
    })
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  copyPassword() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const password = passwordInput.value;

    navigator.clipboard.writeText(password)
      .then(() => {
        this.toastr.info("Password coppied to clipboard")
      })
      .catch((err) => {
        console.error('Unable to copy password to clipboard', err);

      });
  }



  updateRecord() {
    if (this.recordUpdateForm.valid) {
      let recordModel = Object.assign({}, this.recordUpdateForm.value)
      console.log(recordModel);
      this.recordService.update(recordModel).subscribe(response => {
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
