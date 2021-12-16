import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Badge } from 'src/app/Model/Badge';
import { User } from 'src/app/Model/User';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
})
export class BadgeComponent implements OnInit {
  constructor(
    private sessionStroageService: SessionStorageService,
    private router: Router,
    private userService: UserService
  ) {}

  user!: User;
  badges: Badge[] = [];

  async ngOnInit() {
    this.user = this.sessionStroageService.getFromSessionStorage('user');
  
    if (!this.user) {
      this.router.navigate(['/login']);
    }else{
      let userConnected = await this.getUser(this.user.mail)
      this.user = userConnected
      this.sessionStroageService.addToSessionStorage('user',userConnected)
    }
    this.badges = this.user.badges;
  }

  private async getUser(mail : string): Promise<User> {
    return await lastValueFrom(this.userService.getOne(mail));
  }

}
