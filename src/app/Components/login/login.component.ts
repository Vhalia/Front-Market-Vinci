import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/Model/User';
import { LocalStorageService } from 'src/app/services/sessionStorage.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private fb: FormBuilder, 
              private userService: UserService,
              private localStorage : LocalStorageService,
              private router: Router) {}

  userToConnect = {} as User
  userConnected = {} as User
  validateForm!: FormGroup;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  async submitForm(data: any) {
    if (this.validateForm.valid) {
      console.log("je passe dans le component")
      this.userToConnect.mail = data.userName
      this.userToConnect.password = data.password
      this.userConnected = await this.loginAUser()
      this.localStorage.addToSessionStorage('user', this.userConnected)
      this.router.navigate(['/']);
      
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  async loginAUser(): Promise<User>{
    return await lastValueFrom(this.userService.login(this.userToConnect));
  }
}
