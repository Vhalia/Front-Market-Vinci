import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/Model/User';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;
  newUser = {} as User;
  userConnected = {} as User;

  async submitForm() {
    if (this.validateForm.valid) {
      this.newUser.mail = this.validateForm.value.email;
      this.newUser.name = this.validateForm.value.nickname;
      this.newUser.surname = this.validateForm.value.name;
      this.newUser.campus = this.validateForm.value.campus;
      this.newUser.password = this.validateForm.value.password;
      let userConnected = await this.registerAUser()
      this.sessionStorageService.addToSessionStorage('user', userConnected)
      location.reload();

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  async registerAUser(): Promise<User>{
    return await lastValueFrom(this.userService.createOne(this.newUser));
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private fb: FormBuilder, private userService: UserService,
              private sessionStorageService : SessionStorageService,
              private router: Router) {}

  ngOnInit(): void {
    if(this.sessionStorageService.getFromSessionStorage('user') !== undefined)
    this.router.navigate(['/']);

    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      name: [null, [Validators.required]],
      campus: [null, [Validators.required]]
    });
  }
}