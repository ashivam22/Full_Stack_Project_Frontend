import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Supervisor } from '../model/supervisor';
import { Observable, delay } from 'rxjs';
import { SubmitData } from '../model/submitData';
@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  constructor(private http: HttpClient) { }

  //data : Supervisor[]=[];

  public getSupervisorData():Observable<any> {
    const url = "http://localhost:8085/api/supervisors";
    return this.http.get<Supervisor[]>(url).pipe(delay(1000));
  }

  public postData(data :SubmitData){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(data);
    const postUrl = "http://localhost:8085/api/submit";
    return  this.http.post(postUrl,body,{'headers':headers}).toPromise();
  }

}
