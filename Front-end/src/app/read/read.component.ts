import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private api: ApiserviceService ,private router:Router) { }
  readuser: any;
  SuccessMsg: any;


  ngOnInit(): void {
    this.getAlldata();

  }

  deletedata(id: any) {
    // console.log(id);
    this.api.deleteData(id).subscribe((res) => {
      console.log(res, "Delete id No");
      this.router.navigate(['read'])
      this.SuccessMsg = res.message;
      this.getAlldata();
      
     
    })
  }

  getAlldata() {
    this.api.getalluser().subscribe((res) => {
      console.log("Get all user", res);
      this.readuser = res.data;
    })

  }



}
