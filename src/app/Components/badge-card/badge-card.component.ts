import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge-card',
  templateUrl: './badge-card.component.html',
  styleUrls: ['./badge-card.component.css'],
})
export class BadgeCardComponent implements OnInit {
  constructor() {}

  @Input() title!: string;
  @Input() description!: string;
  @Input() image!: string;
  @Input() isUnlocked: boolean = false;

  ngOnInit(): void {}
}
