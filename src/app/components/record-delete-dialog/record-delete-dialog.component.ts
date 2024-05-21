import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-record-delete-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './record-delete-dialog.component.html',
  styleUrl: './record-delete-dialog.component.css'
})
export class RecordDeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<RecordDeleteDialogComponent>) { }

}
