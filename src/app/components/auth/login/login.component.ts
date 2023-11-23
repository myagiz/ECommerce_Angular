import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  isCompleted = true;
  isSuccessCompletedRegister = false;
  emailAddressStr: any
  passwordStr: any
  returnUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
    this.createLoginForm()
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      emailAddress: ['', [Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  login() {
    this.isCompleted = false;
    if (this.loginForm.valid) {
      let model = Object.assign({}, this.loginForm.value);
      this.authService
        .login(model)
        .toPromise()
        .then((data) => {
          if (data.success == false) {
            localStorage.removeItem("token");
            this.isCompleted = true;
          }
          else {
            localStorage.setItem("token", data.data?.accessToken)
            localStorage.setItem("refresh_token", data.data?.refreshToken)
            localStorage.setItem("expiration", data.data?.expiration)
            this.isCompleted = true;
            this.loginForm.reset();
            this.router.navigate(['/']);
            if (this.returnUrl == null || this.returnUrl == '/') {
              this.router.navigate(['/']);

            } else {
              this.router.navigateByUrl(this.returnUrl);
            }
          }
          this.toastrService.success(
            "Login Successfully",
            "E-Commerce"
          ).onHidden.toPromise().then(() => {
          });
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
