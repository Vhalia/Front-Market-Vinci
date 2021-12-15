import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Product } from 'src/app/Model/Product';
import { uploadFileRequest } from 'src/app/Model/UploadFileRequest';
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
      type: [null, [Validators.required]]
    });
  }

  async submitForm() {
    if (this.validateForm.valid) {
      this.newProduct.type = this.validateForm.value.type
      this.newProduct.medias = this.medias;
      this.newProduct.name = this.validateForm.value.name;
      this.newProduct.description = this.validateForm.value.description;
      this.newProduct.adress = this.validateForm.value.implantation;
      this.newProduct.sentType = this.validateForm.value.sentType;
      if (this.newProduct.sentType === 'AVendre') {
        this.newProduct.price = this.validateForm.value.price;
      }
      this.newProduct.sellerId =
        this.sessionStorageService.getFromSessionStorage('user').id;
      console.log(this.newProduct);

      await this.createAProduct()
      this.router.navigate(['/']);
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
      this.msg = 'vous devez selectionner une image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'uniquement les images sont supportées';
      return;
    }

    var reader = new FileReader();
    var splited = event.target.files[0].name.split('.')
    var exstention = splited[splited.length -1]
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      this.urls[this.counter] = reader.result;
      this.medias[this.counter] = {} as uploadFileRequest;
      this.medias[this.counter].content = String(reader.result);
      this.medias[this.counter].fileName = this.sessionStorageService.getFromSessionStorage('user').id+Date.now() + this.counter+"."+ exstention

      this.counter++;
    };
  }

  selectVideo(event: any) {
    //Angular 11, for stricter type
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'vous devez choisir une video';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/video\/*/) == null) {
      this.msg = 'uniquement les videos sont acceptées';
      return;
    }
    console.log(event.target.files[0]);
    
    var reader = new FileReader();
    var splited = event.target.files[0].name.split('.')
    var exstention = splited[splited.length -1]
    reader.readAsDataURL(event.target.files[0]);
   
    reader.onload = (_event) => {
      this.msg = '';
      this.newProduct.video = {} as uploadFileRequest;
      this.newProduct.video.content = String(reader.result);
      this.newProduct.video.fileName = this.sessionStorageService.getFromSessionStorage('user').id+Date.now() + this.counter+"."+ exstention
    };
    
  }
}