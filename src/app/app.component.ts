import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmpDataService } from './shared/services/empData.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'curd-project';

  displayedColumns: string[] = ['id','firstName', 'lastName', 'email','dob','gender','education','company','experience','package','action'];
  dataSource !:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private _dialog : MatDialog, private _dataServ : EmpDataService ){}

  ngOnInit(): void {
    this.getEmployeeList()
    // console.log(this.employeeList)
  }

  openAddEditForm(){
    const dialogRef = this._dialog.open(EmpAddEditComponent)
    dialogRef.afterClosed().subscribe(
      (data : any)=>{if(data){this.getEmployeeList()}}
    )
  }

  // employeeList = [];

  getEmployeeList(){
    this._dataServ.getEmployee().subscribe(
      (data : any)=>{
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
      (err)=>{console.log(err)}
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmp(id : any){
    this._dataServ.deleteEmployee(id).subscribe(
      (res : any)=>{alert('Employee deleted!'),this.getEmployeeList()},
      (err : any)=>{console.log(err)}
    )
  }

  editEmp(data : any){
    const dialogRef = this._dialog.open(EmpAddEditComponent, {data})
    dialogRef.afterClosed().subscribe((updata : any)=>{
      if(updata){
        this.getEmployeeList()
      }
    })
    // console.log(data)
  }


}
