import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-product-sell',
  templateUrl: './detail-product-sell.component.html',
  styleUrls: ['./detail-product-sell.component.css']
})
export class DetailProductSellComponent implements OnInit {

  validateForm!: FormGroup;

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userMail: [null, [Validators.required]],
    });
  }

}
