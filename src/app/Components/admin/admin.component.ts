import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Product } from 'src/app/Model/Product';
import { User } from 'src/app/Model/User';
import { ProductService } from 'src/app/services/product.service';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  products: Product[] = [];

  searchValue = '';
  visible = false;
  listOfDisplayData: User[] = [...this.users];
  validateForm!: FormGroup;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private sessionService: SessionStorageService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    let user = this.sessionService.getFromSessionStorage('user');
    if (user === undefined) this.router.navigate(['/login']);
    if (user.isAdmin == false) this.router.navigate(['/']);

    this.getAllUsers();
    this.getProductsNotValideted();
    this.validateForm = this.fb.group({
      reason: [null, [Validators.required]],
    });
  }
  getProductsNotValideted(): void {
    this.productService.getNotValidated().subscribe((products) => {
      this.products = products;
    });
  }

  getAllUsers(): void {
    this.userService.getAll().subscribe((users) => {
      this.users = users;
      this.listOfDisplayData = users;
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.users.filter((item) =>
      item.mail.includes(this.searchValue)
    );
  }

  async validProduct(id: string) {
    let body = { isValidated: true };
    await this.patchAProduct(id, body);
    location.reload();
  }

  private async patchAProduct(id: string, body: any): Promise<Product> {
    return await lastValueFrom(this.productService.patchProduct(id, body));
  }

  submitForm(id: string) {
    if (this.validateForm.valid) {
      let body = {
        isValidated: false,
        reasonNotValidated: this.validateForm.value.reason,
      };
      this.patchAProduct(id, body);
      location.reload();
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
