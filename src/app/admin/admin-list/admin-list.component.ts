import { Component,OnInit } from '@angular/core';
import { UserListService } from 'src/app/core/user-list.service';


export interface ADMINS{
  id : number,
  name : string,
  username : string,
  phone : number,
  email : string,
  role : string
}

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit{
  admins : ADMINS[]= []
  constructor(private service : UserListService){}
  ngOnInit(): void {
    this.service.adminList().subscribe(data =>{
      this.admins = data
    },
    error =>{
      console.error("could not fetch",error)
    }
  )
  }
}
