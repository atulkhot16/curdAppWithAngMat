import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpDataService } from '../shared/services/empData.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {

  // @Inject(MAT_DIALOG_DATA) public data : any;

  empForm : FormGroup;

  constructor(
    private _fb : FormBuilder,
    private _empDataServ : EmpDataService,
    private _dialogRef : MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) { 
    this.empForm = this._fb.group({
      firstName : '',
      lastName : '',
      email : '',
      dob : '',
      gender : '',
      education : '',
      company : '',
      experience : '',
      package : '',
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
    console.log(this.data)
  }

  education : any[] = [
    'Matric','Diploma','Intermediate','Graduation'
  ]

  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empDataServ.editEmployee(this.data.id,this.empForm.value).subscribe(
          (data : any)=>{alert('Employee details updated'), this._dialogRef.close(true),this._empDataServ.getEmployee()},
          (err : any)=>{console.log(err)}
        )
      }else{
        this._empDataServ.addEmployee(this.empForm.value).subscribe(
          (data : any)=>{alert('Employee added successfully'), this._dialogRef.close(true),this._empDataServ.getEmployee()},
          (err : any)=>{console.log(err)}
        )
      }
      
    }
  }

}
