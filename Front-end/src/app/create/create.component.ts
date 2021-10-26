import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  errMsg: any;
  SuccessMsg: any;
  getparamId: any;

  constructor(
    private api: ApiserviceService,
    private router: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.getparamId = this.router.snapshot.paramMap.get('id');
    this.api.getbyID(this.getparamId).subscribe((res) => {
      console.log(res, 'Selected update data');
      this.userForm.patchValue({
        fullname: res.data[0].fullname,
        email: res.data[0].email,
        mobile: res.data[0].mobile,
        address: res.data[0].address,
        education: res.data[0].education,
        country: res.data[0].country,
        state: res.data[0].state,

      })
    })
  }

  userForm = new FormGroup({
    'fullname': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'mobile': new FormControl('', Validators.required),
    'address': new FormControl('', Validators.required),
    'education': new FormControl('', Validators.required),
    'country': new FormControl('', Validators.required),
    'state': new FormControl('', Validators.required),
  })

  StudSubmit() {
    // console.log(this.userForm.value)
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.api.createuser(this.userForm.value).subscribe((res) => {
        console.log(res, 'data added success');
        this.userForm.reset();
        this.SuccessMsg = res.message;
        this.route.navigate(['view'])

      })
    } else {
      this.errMsg = "Enter All Required Information";
    }
  }

  updateStud() {
    // console.log(this.userForm.value);
    if (this.userForm.valid) {
      this.api.updatestud(this.userForm.value, this.getparamId).subscribe((res) => {
        console.log(res, 'Data update scccess')
        this.SuccessMsg = res.message;
        this.route.navigate(['view'])

      })
    } else {
      this.errMsg = 'Enter All Required Information'

    }


  }
}
