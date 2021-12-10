import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/Model/User';
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
      console.log('submit', this.validateForm.value);
      this.newUser.mail = this.validateForm.value.email;
      this.newUser.name = this.validateForm.value.nickname;
      this.newUser.surname = this.validateForm.value.name;
      this.newUser.campus = this.validateForm.value.campus;
      this.newUser.password = this.validateForm.value.password;
      let response = await this.loginAUser()
      console.log(response)
      

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
    return await lastValueFrom(this.userService.login(this.newUser));
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

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      name: [null, [Validators.required]],
      campus: [null, [Validators.required]],
      agree: [false]
    });
  }
}