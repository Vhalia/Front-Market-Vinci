import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-mail',
  templateUrl: './profile-mail.component.html',
  styleUrls: ['./profile-mail.component.css']
})
export class ProfileMailComponent implements OnInit {

  validateForm!: FormGroup;

  displayUpdateInput(): void {
    this.displayUpdate = true;
  }

  constructor(private fb: FormBuilder) { }

  @Input()
  title!: string;

  @Input()
  value!: string;

  @Input()
  displayEdit!: boolean;

  @Input()
  displayUpdate!: boolean;

  @Output()
  mailUpdateEvent = new EventEmitter<string>();

  mailUpdate(value: any){
    console.log(value);
    this.mailUpdateEvent.emit(value.newValueInput);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      newValueInput: [null, [Validators.required]]
    });
  }

}
