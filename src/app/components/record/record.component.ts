import { Component, OnInit } from '@angular/core';
import { RecordDetail } from '../../models/recordDetail';
import { RecordDetailService } from '../../services/recordDetail.service';
import { Record } from '../../models/record';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecordService } from '../../services/record.service';
import { ToastrService } from 'ngx-toastr';
import { RecordDetailComponent } from '../record-detail/record-detail.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, CellClickedEvent, GridOptions, GridApi } from 'ag-grid-community';
import { MatDialog, MatDialogModule, } from '@angular/material/dialog';
import { RecordDeleteDialogComponent } from '../record-delete-dialog/record-delete-dialog.component';
import { AddRecordComponent } from '../add-record/add-record.component';
@Component({
  selector: 'app-record',
  standalone: true,
  imports: [AddRecordComponent, MatDialogModule, AgGridAngular, CommonModule, RecordDetailComponent],
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
      filter: true,
      floatingFilter: true,
      minWidth: 200,
      filterParams: { defaultOption: "contains" }
    },
    {
      field: 'Folder',
      resizable: false,
      filter: true,
      floatingFilter: true,
      minWidth: 200,
      filterParams: { defaultOption: "contains" }
    },
    {
      field: 'Username',
      resizable: false,
      minWidth: 320,
      onCellClicked: (event: CellClickedEvent) => {
        if (event.data.Username) {
          this.copyToClipboard(event.data.Username)
        } else this.toastr.error("There is no data", "Error")
      }
    },
    {
      field: 'Password',
      resizable: false,
      minWidth: 200,
      cellRenderer: (params) => { return params.value.replace(/./g, '*'); },
      onCellClicked: (event: CellClickedEvent) => this.copyToClipboard(event.data.Password)

    },
    {
      field: 'Url',
      resizable: false,
      minWidth: 300,
      onCellClicked: (event: CellClickedEvent) => {
        if (event.value) {
          window.open(event.value, '_blank')
        } else this.toastr.error("There is no url", "Error")
      }
    },
    {
      field: 'Notes',
      minWidth: 250,
    },
    {
      field: 'Delete',
      minWidth: 50,
      maxWidth:75,
      resizable: false,
      cellRenderer: () => {
        return '<i class="bi bi-trash-fill" style="cursor:pointer; font-size:16px;"></i>';
      },
      onCellClicked: (event: CellClickedEvent) => this.deleteRecord(event.data.id),
      headerName: '',
      filter: false,
      suppressSizeToFit: true,
    }

  ];

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
        await this.getRecordById(id);
        this.recordService.delete(this.recordToDelete).subscribe(
          response => {
            this.toastr.success(response.message, "Success");
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

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
      .then(() => {
        this.toastr.info("Text copied to clipboard for 10 seconds.");

        setTimeout(async () => {
          try {
            await navigator.clipboard.writeText('');
            this.toastr.warning("Clipboard cleared");
          } catch (err) {
            this.toastr.error("Clipboard couldn't be cleared");
          }
        }, 10000);
      })
      .catch(err => this.toastr.warning("Text couldn't be copied to clipboard"));
  }

  openDialog() {
    return this.dialog.open(RecordDeleteDialogComponent, {
      width: '550px',
      panelClass: 'matdialog-delete'
    });
  }

}

