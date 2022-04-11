import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StorageService } from '../Storage.service';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  
  signupForm: FormGroup;
  username:string;
  email:string;
  subscription: Subscription;
  UserData:{name:string, email:string}[]=[];

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      'name': new FormControl(null,Validators.required),
      'email': new FormControl(null,[Validators.email,Validators.required]),
    });
    this.subscription = this.storageService.UserdataChanged.subscribe((data:any)=>{


      this.UserData=data;
    });
  }

  onSubmit(){
   this.username=this.signupForm.value.name;
    this.email =this.signupForm.value.email;
   this.storageService.add(this.username,this.email);
   

  }

  onClear(){
    this.storageService.clear();
    
    this.signupForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
