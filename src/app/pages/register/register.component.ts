import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent
{
  private readonly _authService = inject(AuthService)
  private readonly _router = inject(Router)

  successMessage: string = ''
  errorMessage: string = ''
  isLoading: boolean = false

  registerForm: FormGroup = new FormGroup
    ({
      name: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z\u0600-\u06FF\s']+$/)
        ]),
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
      age: new FormControl('',
        [
          Validators.required,
          Validators.min(10),
          Validators.max(100),
          Validators.pattern(/^\d+$/)
        ]),
      phone: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/),
          Validators.pattern(/^\d{11}$/)
        ]),
    })

  submitRegisterForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true
      this._authService.sendRegisterData(this.registerForm.value).subscribe
        ({
          next: (res) => {
            if (res.msg === "done") {
              console.log(res);
              this.registerForm.reset()
              setTimeout(() => {
                this._router.navigate(['/login'])
              }, 600)
              this.successMessage = res.msg
              this.isLoading = false
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.errorMessage = err.error.msg
            this.isLoading = false
          }
        })
    }
    else
          {
            this.registerForm.markAllAsTouched()
          }
  }
}
