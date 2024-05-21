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
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, CellClickedEvent } from 'ag-grid-community';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
import { RecordDeleteDialogComponent } from '../record-delete-dialog/record-delete-dialog.component';
@Component({
  selector: 'app-record',
  standalone: true,
  imports: [MatDialogModule, AgGridAngular, CommonModule, HidePasswordPipe, RecordDetailComponent],
  templateUrl: './record.component.html',
  styleUrl: './record.component.css'
})
export class RecordComponent implements OnInit {
  recordDetails: RecordDetail[] = [];
  records: Record[] = []
  recordToDelete: any
  rowData: any[] = [];
  constructor(public dialog: MatDialog, private toastr: ToastrService, private recordService: RecordService, private recordDetailService: RecordDetailService, private activatedRoute: ActivatedRoute) { }

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

  updateRowData() {
    this.rowData = this.recordDetails.map(detail => {
      return {
        id: detail.id,
        Name: detail.title,
        Folder: detail.categoryName,
        Username: detail.username,
        Password: detail.password,
        Url: detail.url,
        Notes: detail.notes
      };
    });
  }


  colDefs: ColDef[] = [
    {
      field: 'Name',
      resizable: false,
      filter: 'true',
      filterParams:{defaultOption:"contains"}

    },
    { field: 'Folder', resizable: false },
    { field: 'Username', resizable: false },
    {
      field: 'Password', resizable: false,
      cellRenderer: (params) => { return params.value.replace(/./g, '*'); }
    },
    {
      field: '', resizable: false,
      cellRenderer: () => {
        return '<i class="bi bi-copy" style="cursor:pointer; font-size:16px;"></i>';
      },
      onCellClicked: (event: CellClickedEvent) => this.copyPassword(event.data.Password),
      width: 60,
      headerName: '',
      filter: false,
      suppressSizeToFit: true,
    },
    {
      field: 'Url', width: 270, resizable: false,
      onCellClicked: (event: CellClickedEvent) => window.open(event.value, '_blank')
    },
    { field: 'Notes', width: 300 },
    {
      field: 'Delete', resizable: false,
      cellRenderer: () => {
        return '<i class="bi bi-trash-fill" style="cursor:pointer; font-size:16px;"></i>';
      },
      onCellClicked: (event: CellClickedEvent) => this.deleteRecord(event.data.id),
      width: 60,
      headerName: '',
      filter: false,
      suppressSizeToFit: true,
    }

  ];

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
    const result = await this.openDialog().afterClosed().toPromise();

    if (!result) {
      return;
    } else {
      try {
        debugger
        await this.getRecordById(id);
        this.recordService.delete(this.recordToDelete).subscribe(
          response => {
            this.toastr.success(response.message, "Success");
            this.refreshPage();
          },
          responseError => {
            if (responseError.error?.Errors?.length > 0) {
              for (let i = 0; i < responseError.error.Errors.length; i++) {
                this.toastr.error(responseError.error.Errors[i].ErrorMessage, "Validation Error");
              }
            }
          }
        );
      } catch (error) {
        console.error("An error occurred while deleting the record:", error);
      }
    }
  }

  getRecordDetails() {
    this.recordDetailService.getRecordDetails().subscribe(response => {
      this.recordDetails = response.data
      this.updateRowData();
    })
  }

  async getRecordDetailsByCategoryId(categoryId: number) {
    await this.recordDetailService.getRecordDetailsByCategoryId(categoryId).subscribe(response => {
      this.recordDetails = response.data
      this.updateRowData();
    })
  }

  copyPassword(password: string) {
    navigator.clipboard.writeText(password)
      .then(() => this.toastr.info("Password coppied to clipboard"))
      .catch(err => this.toastr.warning("Password couldn't coppied to clipboard"));
  }

  openDialog() {
    return this.dialog.open(RecordDeleteDialogComponent, {
      width: '550px',
      panelClass: 'matdialog-delete'
    });
  }


}
