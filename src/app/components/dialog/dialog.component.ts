import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Status } from '../../interfaces/models';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatSelectModule, CommonModule, ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
  dynamicForm!: FormGroup;
  statuses = Object.keys(Status).filter((key) => isNaN(Number(key)));

  constructor(@Inject(MAT_DIALOG_DATA) public data: { itemType: string; fields: string[] },
private fb: FormBuilder) { }

ngOnInit(): void {
  this.dynamicForm = this.fb.group({});

  this.data.fields.forEach((field) => {
    if (field === 'status') {
      this.dynamicForm.addControl(field, this.fb.control(this.statuses[0], Validators.required));
    } else {
      this.dynamicForm.addControl(field, this.fb.control(''));
    }
  });
}
}
