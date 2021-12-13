import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UploadOutline } from '@ant-design/icons-angular/icons';
import { lastValueFrom } from 'rxjs';
import { Product } from 'src/app/Model/Product';
import { uploadFileRequest } from 'src/app/Model/UploadFileRequest';
import { User } from 'src/app/Model/User';
import { ProductService } from 'src/app/services/product.service';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  validateForm!: FormGroup;
  newProduct = {} as Product;

  constructor(
    private fb: FormBuilder,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    if (this.sessionStorageService.getFromSessionStorage('user') === undefined)
      this.router.navigate(['/']);

    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      sentType: [null, [Validators.required]],
      price: [null, [Validators.required]],
      implantation: [null, [Validators.required]],
    });
  }

  async submitForm() {
    if (this.validateForm.valid) {
      this.newProduct.medias = this.medias;
      this.newProduct.name = this.validateForm.value.name;
      this.newProduct.description = this.validateForm.value.description;
      this.newProduct.adress = this.validateForm.value.implantation;
      this.newProduct.sentType = this.validateForm.value.sentType;
      if (this.newProduct.sentType === 'AVendre') {
        this.newProduct.price = this.validateForm.value.price;
      } else {
        this.newProduct.price = 0;
      }
      this.newProduct.sellerId =
        this.sessionStorageService.getFromSessionStorage('user').id;
      console.log(this.newProduct);

      //await this.createAProduct()
      //this.router.navigate(['/']);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  async createAProduct(): Promise<Product> {
    return await lastValueFrom(this.productService.createOne(this.newProduct));
  }

  //display images just uploaded
  //url: any; //Angular 11, for stricter type
  msg = '';
  urls: any[] = [];
  counter: number = 0;
  medias: uploadFileRequest[] = [];

  //selectFile(event) { //Angular 8
  selectFile(event: any) {
    //Angular 11, for stricter type
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      //this.url = reader.result;
      console.log('2', reader.result);
      this.urls[this.counter] = reader.result;
      this.medias[this.counter] = {} as uploadFileRequest;
      this.medias[this.counter].filePath = String(reader.result);
      this.counter++;
    };
  }
}
