import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users : User[] = [];
  
  searchValue = '';
  visible = false;  
  listOfDisplayData: User[] = [...this.users];
  
  constructor(private userService : UserService) { }


  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(): void {
    this.userService.getAll().subscribe(users => {
      this.users = users
      this.listOfDisplayData = users
      console.log(users);
    })
  }



  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.users.filter(item => item.mail.includes(this.searchValue));
  }

}
