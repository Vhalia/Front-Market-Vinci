import { Component, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';
import { SessionStorageService } from 'src/app/services/sessionStorage.service'
import { ProfileElementComponent } from '../profile-element/profile-element.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loading = true;

  user = {} as User;
  userToUpdate = {} as User;
  like : number = 0;
  dislike : number = 0;
  evaluation : number = 0;

  constructor( private userService : UserService, private sessionService : SessionStorageService) { }

  async updateMail(newMail: any) {
    
    this.userToUpdate.mail = newMail;
    
    await this.updateOne();
    this.sessionService.addToSessionStorage("user", this.userToUpdate);
    this.ngOnInit();
    location.reload();
  }

  async ngOnInit() {
    this.user = await this.getOne(this.sessionService.getFromSessionStorage("user").mail);
    this.loading = false;

    this.user.ratings.forEach(rating => {
      if(rating.like == 1){
        this.like++;
      } else if(rating.like == -1){
        this.dislike++;
      }
    });

    if(this.like > 0 && this.dislike == 0){
      this.evaluation = 100;
    } else if(this.like > 0 && this.dislike > 0) {
      this.evaluation = Math.round(this.like / (this.like + this.dislike) * 100)
    }

    this.userToUpdate = this.user;
  }

  async getOne(mail : string): Promise<User> {
    return await lastValueFrom(this.userService.getOne(mail));
  }

  async updateOne(): Promise<User> {
    return await lastValueFrom(this.userService.updateOne(this.user.id,this.userToUpdate));
  }
  
}
