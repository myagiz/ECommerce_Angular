import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GetAllUserModel } from 'src/app/core/models/user/getAllUserModel';
import { UserService } from 'src/app/core/services/user/user.service';
import Swal from 'sweetalert2';
declare const $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  getAllUserModel: GetAllUserModel[] = []
  createFormVisible: any = false
  updateFormVisible: any = false
  isCompleted = true;
  createUserFormGroup!: FormGroup
  updateUserFormGroup!: FormGroup

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getAllUser()
    this.createUserForm();
    this.updateUserForm();
  }


  openCreateForm() {
    this.createFormVisible = true;
    this.updateFormVisible = false;
  }

  openUpdateForm(id: number) {
    this.updateFormVisible = true;
    this.createFormVisible = false;
    this.getUserById(id)
  }

  closeCreateForm() {
    this.createFormVisible = false;

  }
  closeUpdateForm() {
    this.updateFormVisible = false;

  }

  createUserForm() {
    this.createUserFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(255)]],
      lastName: ['', [Validators.required, Validators.maxLength(255)]],
      emailAddress: ['', [Validators.email, Validators.maxLength(255)]],
      roleId: ['', [Validators.required]],
    });
  }

  updateUserForm() {
    this.updateUserFormGroup = this.formBuilder.group({
      id: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.maxLength(255)]],
      lastName: ['', [Validators.required, Validators.maxLength(255)]],
      emailAddress: ['', [Validators.email, Validators.maxLength(255)]],
      roleId: ['', [Validators.required]],
    });
  }

  getAllUser() {
    this.userService.getAllUser().subscribe(response => {
      this.getAllUserModel = response.data
      setTimeout(()=>{                          
        $('#userDataTable').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true,
          lengthMenu : [5, 10, 25],
          order:[[1,"desc"]]
      } );
      }, 1);
    }, error => {
      this.getAllUserModel = []
    })
  }

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe(response => {
      this.updateUserFormGroup.patchValue(response.data);
    }, error => {
      this.toastrService.error(
        "Error",
        "E-Commerce"
      )
    })
  }

  createUser() {
    this.isCompleted = false;
    if (this.createUserFormGroup.valid) {
      let model = Object.assign({}, this.createUserFormGroup.value);
      this.userService
        .createUser(model)
        .toPromise()
        .then((data) => {
          this.isCompleted = true;
          this.createUserFormGroup.reset();
          this.getAllUser()
          this.toastrService.success(
            "Added successfully!",
            "E-Commerce"
          ).onHidden.toPromise().then(() => {
          });
        })
        .catch((error) => {
          this.isCompleted = true;
          this.toastrService.error(
            "Error",
            "E-Commerce"
          )
        })
        .finally(() => {

        });
    } else {
      this.isCompleted = true;
      this.toastrService.error(
        "Try later",
        "E-Commerce"
      );
    }
  }

  updateUser() {
    this.isCompleted = false;
    if (this.updateUserFormGroup.valid) {
      let model = Object.assign({}, this.updateUserFormGroup.value);
      this.userService
        .updateUser(model)
        .toPromise()
        .then((data) => {
          this.isCompleted = true;
          this.closeUpdateForm();
          this.updateUserFormGroup.reset();
          this.getAllUser()
          this.toastrService.success(
            "Updated successfully!",
            "E-Commerce"
          ).onHidden.toPromise().then(() => {
          });
        })
        .catch((error) => {
          this.isCompleted = true;
          this.toastrService.error(
            "Error",
            "E-Commerce"
          )
        })
        .finally(() => {

        });
    } else {
      this.isCompleted = true;
      this.toastrService.error(
        "Try later",
        "E-Commerce"
      );
    }
  }



  deleteUser(id: number) {
    Swal.fire({
      title: '<h4>Are you sure want to delete?</h4>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f46a6a',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Close'
      // cancelButtonColor:"#000"
    }).then(result => {
      if (result.value) {
        this.userService
          .deleteUser(id)
          .toPromise()
          .then((data) => {
            Swal.fire({
              icon: 'success',
              title: "Successfully!",
              showConfirmButton: false,
              timer: 1200,
              timerProgressBar: true

            });
            this.getAllUser();
          })
          .catch((error) => {
            this.toastrService.error(
              "Error",
              "E-Commerce"
            )
          })
          .finally(() => {

          });
      }
    });

  }

}
