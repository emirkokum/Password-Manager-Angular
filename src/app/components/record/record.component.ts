import { Component, OnInit } from '@angular/core';
import { RecordDetail } from '../../models/recordDetail';
import { RecordDetailService } from '../../services/recordDetail.service';
import { Record } from '../../models/record';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HidePasswordPipe } from '../../pipes/hide-password.pipe';
import { RecordService } from '../../services/record.service';
import { ToastrService } from 'ngx-toastr';
import { RecordDetailComponent } from '../record-detail/record-detail.component';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [CommonModule, HidePasswordPipe,RecordDetailComponent],
  templateUrl: './record.component.html',
  styleUrl: './record.component.css'
})
export class RecordComponent implements OnInit {
  recordDetails: RecordDetail[] = [];
  records: Record[] = []
  recordToDelete: any

  constructor(private toastr: ToastrService, private recordService: RecordService, private recordDetailService: RecordDetailService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["categoryId"]) {
        this.getRecordDetailsByCategoryId(params["categoryId"])
      }
      else {
        this.getRecordDetails()
      }
    })
  }

  refreshPage() {
    this.getRecordDetails()
  }

  async getRecordById(id: number) {
    const response = await this.recordService.getRecordById(id).toPromise();
    this.recordToDelete = response.data;
  }

  async confirmDelete(id: number) {
    if (confirm("Are you sure you want to delete this record?")) {
      await this.deleteRecord(id);
    }
  }

  async deleteRecord(id: number) {
    await this.getRecordById(id);
    this.recordService.delete(this.recordToDelete).subscribe(response => {
      this.toastr.success(response.message, "Success");
      this.refreshPage();
    }, responseError => {
      if (responseError.error?.Errors?.length > 0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastr.error(responseError.error.Errors[i].ErrorMessage, "Validation Error")
        }
      }
    });
  }

  getRecordDetails() {
    this.recordDetailService.getRecordDetails().subscribe(response => {
      this.recordDetails = response.data
    })
  }

  async getRecordDetailsByCategoryId(categoryId: number) {
    await this.recordDetailService.getRecordDetailsByCategoryId(categoryId).subscribe(response => {
      this.recordDetails = response.data
    })
  }

  copyPassword(password: string) {
    navigator.clipboard.writeText(password)
      .then(() => this.toastr.info("Password coppied to clipboard"))
      .catch(err => this.toastr.warning("Password couldn't coppied to clipboard"));
  }


}
