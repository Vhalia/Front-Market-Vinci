import { Component, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';
import { SessionStorageService } from 'src/app/services/sessionStorage.service'

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
  isBanned : boolean = false;

  constructor( private userService : UserService, private sessionService : SessionStorageService) { }

  async ngOnInit() {
    this.user = await this.getUser(this.sessionService.getFromSessionStorage("user").mail);
    this.loading = false;

    //Calculating user ratings
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

    //Initialising component variables
    this.userToUpdate = this.user;
    this.isBanned = this.user.isBanned;
  }

  async updateMail(newMail: any) {
    this.userToUpdate.mail = newMail;
    await this.updateUser();
    this.sessionService.addToSessionStorage("user", this.userToUpdate);
    location.reload();
  }

  async updatePassword(newPassword: any) {
    this.userToUpdate.password = newPassword;
    await this.updateUser();
    this.sessionService.addToSessionStorage("user", this.userToUpdate);
    location.reload();
  }

  async banUser() {
    this.userToUpdate.isBanned = !this.userToUpdate.isBanned;
    await this.updateUser();
    this.sessionService.addToSessionStorage("user", this.userToUpdate);
    location.reload();
  }

  async unbanUser() {
    this.userToUpdate.isBanned = !this.userToUpdate.isBanned;
    await this.updateUser();
    this.sessionService.addToSessionStorage("user", this.userToUpdate);
    location.reload();
  }

  //Methods calling services
  async getUser(mail : string): Promise<User> {
    return await lastValueFrom(this.userService.getOne(mail));
  }

  async updateUser(): Promise<User> {
    return await lastValueFrom(this.userService.updateOne(this.user.id,this.userToUpdate));
  }
  
}
