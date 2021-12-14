import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Badge } from 'src/app/Model/Badge';
import { User } from 'src/app/Model/User';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
})
export class BadgeComponent implements OnInit {
  constructor(
    private sessionStroageService: SessionStorageService,
    private router: Router
  ) {}

  user!: User;
  badges: Badge[] = [];

  ngOnInit(): void {
    this.user = this.sessionStroageService.getFromSessionStorage('user');
    if (!this.user) {
      this.router.navigate(['login']);
    }
    this.badges = this.user.badges;
  }
}
