import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GetAllProductModel } from 'src/app/core/models/product/getAllProductModel';
import { ProductService } from 'src/app/core/services/product/product.service';
import Swal from "sweetalert2";

declare const $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {
  @ViewChild('dTable', { static: false }) dataTable: any
  getAllProductModel: GetAllProductModel[] = []
  createFormVisible: any = false
  updateFormVisible: any = false
  isCompleted = true;
  createProductFormGroup!: FormGroup
  updateProductFormGroup!: FormGroup


  constructor(
    private productService: ProductService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngAfterViewInit(): void {
    $(this.dataTable.nativeElement).DataTable();

  }
  ngOnInit(): void {
    this.getAllProducts()
    this.createProductForm();
    this.updateProductForm();
  }

  openCreateForm() {
    this.createFormVisible = true;
    this.updateFormVisible = false;
  }

  openUpdateForm(id: number) {
    this.updateFormVisible = true;
    this.createFormVisible = false;
    this.getProductById(id)
  }

  closeCreateForm() {
    this.createFormVisible = false;

  }
  closeUpdateForm() {
    this.updateFormVisible = false;

  }

  createProductForm() {
    this.createProductFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      categoryId: ['', [Validators.required]],
      unitPrice: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });
  }

  updateProductForm() {
    this.updateProductFormGroup = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(255)]],
      categoryId: ['', [Validators.required]],
      unitPrice: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });
  }

  getAllProducts() {
    this.productService.getAllCustomers().subscribe(response => {
      this.getAllProductModel = response.data
    }, error => {
      this.getAllProductModel = []
    })
  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe(response => {
      this.updateProductFormGroup.patchValue(response.data);
    }, error => {
      this.toastrService.error(
        "Error",
        "E-Commerce"
      )
    })
  }

  createProduct() {
    this.isCompleted = false;
    if (this.createProductFormGroup.valid) {
      let model = Object.assign({}, this.createProductFormGroup.value);
      this.productService
        .createProduct(model)
        .toPromise()
        .then((data) => {
          this.isCompleted = true;
          this.createProductFormGroup.reset();
          this.getAllProducts()
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

  updateProduct() {
    this.isCompleted = false;
    if (this.updateProductFormGroup.valid) {
      let model = Object.assign({}, this.updateProductFormGroup.value);
      this.productService
        .updateProduct(model)
        .toPromise()
        .then((data) => {
          this.isCompleted = true;
          this.closeUpdateForm();
          this.updateProductFormGroup.reset();
          this.getAllProducts()
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



  deleteProduct(id: number) {
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
        this.productService
          .deleteProduct(id)
          .toPromise()
          .then((data) => {
            Swal.fire({
              icon: 'success',
              title: "Successfully!",
              showConfirmButton: false,
              timer: 1200,
              timerProgressBar: true

            });
            this.getAllProducts();
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
