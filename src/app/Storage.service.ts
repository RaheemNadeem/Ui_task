import { Subject } from "rxjs";

export class StorageService{

    UserData:{name:string, email:string}[]=[];
    UserdataChanged = new Subject();

    add(username:string,useremail:string){
        this.UserData.push({name:username,email:useremail});
        this.UserdataChanged.next(this.UserData.slice());
        

        
    }

    get(){

        return this.UserData.slice();
    }
    clear(){

        this.UserData=[];
        this.UserdataChanged.next(this.UserData.slice());
    };



}