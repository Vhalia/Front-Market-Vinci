import { Component, OnInit } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loading = true;

  user = {} as User;
  evaluation : number = 0;

  constructor( private userService : UserService) { }

  async ngOnInit() {
    this.user = await this.getOne("dragon@vinci.zw");
    this.loading = false;

    if(this.user.like > 0 && this.user.dislike == 0){
      this.evaluation = 100;
    } else if(this.user.like > 0 && this.user.dislike > 0) {
      this.evaluation = Math.round(this.user.like / (this.user.like + this.user.dislike) * 100)
    }
  }

  

  async getOne(mail : string): Promise<User> {
    return await lastValueFrom(this.userService.getOne(mail));
  }
  
}
