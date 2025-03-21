import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent
{


  private readonly _authService = inject(AuthService)
  private readonly _router = inject(Router)

  successMessage: string = ''
  errorMessage: string = ''
  isLoading: boolean = false

  loginForm: FormGroup = new FormGroup
    ({
     
      email: new FormControl('',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net)$/)
        ]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        ]),
    })

  submitloginForm(): void
  {
    if (this.loginForm.valid)
    {
      this.isLoading = true
      this._authService.sendLoginData(this.loginForm.value).subscribe
        ({
          next: (res) =>
          {
            if (res.msg === "done")
            {
              console.log(res);
              this.loginForm.reset()
              localStorage.setItem('userToken' , res.token)
              setTimeout(() => {
                this._router.navigate(['/home'])
              }, 600)
              this.successMessage = res.msg
              this.isLoading = false
            }
          },
          error: (err: HttpErrorResponse) =>
          {
            console.log(err);
            this.errorMessage = err.error.msg
            this.isLoading = false
          }
        })
    }
    else {
      this.loginForm.markAllAsTouched()
    }
  }

}
