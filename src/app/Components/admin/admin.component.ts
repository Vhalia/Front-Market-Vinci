import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';
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
  
  constructor(private userService : UserService,
              private sessionService : SessionStorageService,
              private router : Router) { }


  ngOnInit(): void {
    let user = this.sessionService.getFromSessionStorage('user');
    if(user === null)
      this.router.navigate(['/login']);
    if(user.isAdmin == false)
      this.router.navigate(['/'])

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
