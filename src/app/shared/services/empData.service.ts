import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";

@Injectable({
    providedIn : 'root'
})

export class EmpDataService{
    constructor(private _http : HttpClient){}

    addEmployee(emp : any) : Observable<any>{
      return this._http.post('http://127.0.0.1:4000/employees',emp)
        
        // console.log(emp)
    }

    editEmployee(id : any, data : any){
        return this._http.put(`http://127.0.0.1:4000/employees/${id}`,data)
    }

    getEmployee(){
        return this._http.get('http://127.0.0.1:4000/employees')
    }

    deleteEmployee(id : any){
        return this._http.delete(`http://127.0.0.1:4000/employees/${id}`)
    }
}