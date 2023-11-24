import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
// import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
  isCompleted = true;
  isSuccessCompletedRegister = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    // private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(255)]],
      lastName: ['', [Validators.required, Validators.maxLength(255)]],
      emailAddress: ['', [Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  register() {
    this.isCompleted = false;
    if (this.registerForm.valid) {
      let model = Object.assign({}, this.registerForm.value);
      this.authService
        .register(model)
        .toPromise()
        .then((data) => {
          this.isCompleted = true;
          this.registerForm.reset();
          this.isSuccessCompletedRegister = true;
          // this.toastrService.success(
          //   "Added successfully!",
          //   "E-Commerce"
          // ).onHidden.toPromise().then(() => {
          // });
          // this.getAllCustomers();
        })
        .catch((error) => {
          this.isCompleted = true;
          // this.toastrService.error(
          //   "Error",
          //   "E-Commerce"
          // )
        })
        .finally(() => {

        });
    } else {
      this.isCompleted = true;
      // this.toastrService.error(
      //   "",
      //   ""
      // );
    }
  }


}
