import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from './service/backend-service.service';
import { Supervisor } from './model/supervisor';
import { SubmitData } from './model/submitData';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LightFeather-ui';
  constructor(private backendService: BackendServiceService) { }
  response: any;
  data: Supervisor[] = [];
  defaultsupervisor: string = "select ...";
  selectedData: any;
  res: any;
  model: SubmitData = {
    firstName: '',
    lastName: '',
    supervisor: {
      firstName: '',
      jurisdiction: '',
      lastName: ''
    },
    phoneNumber: '',
    email: ''
  }

  ngOnInit() {
    this.backendService.getSupervisorData().subscribe(data => {
      this.data = data;
      console.log(data);
    },
      err => console.log("error in http get data service"));

  }
  register(sup: NgForm) {
    console.log(this.model);
    // this.backendService.postData(this.model)
    //   .subscribe(data => {
    //     setTimeout(() => {
    //       sup.reset();
    //     }, 1000);

    //     console.log("response data", data)
    //     this.response = data;
    //   }, err => {
    //     console.log("error occured");
    //     return;
    //   });
    // setTimeout(() => {
    //   //console.log("timeou called", this.response);
    //  // sup.reset();
    // }, 1000);
    this.backendService.postData(this.model).then(data => {
      sup.reset();
      console.log("data inserted");
    }).catch((error: HttpErrorResponse) => {
      if (error.status != 201) {
        console.log("data error", error);
        alert("Error Occured " + error.error.errorMessage);
      } else {
        sup.reset();
        sup.controls['superVisor'].reset();
        alert("Data inserted successfully");
        console.log("data inserted");
      }

    })

    return true;

  }
  onOptionsSelected(value: any) {
    console.log(this.data[value]);
    this.model.supervisor = this.data[value];
  }
}







