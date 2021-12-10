import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-element',
  templateUrl: './profile-element.component.html',
  styleUrls: ['./profile-element.component.css']
})
export class ProfileElementComponent implements OnInit {

  validateForm!: FormGroup;

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

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

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      newValueInput: [null, [Validators.required]]
    });
  }

}
