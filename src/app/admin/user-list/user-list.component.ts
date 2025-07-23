import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserListService } from 'src/app/core/user-list.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  users : any[] = []
  constructor(private http : HttpClient, private service : UserListService){}
  ngOnInit(): void {
    this.service.userList().subscribe(data =>{
      this.users = data
    },
    error=>{
      console.error("could not fetch",error)
    }
    )
  }
}
