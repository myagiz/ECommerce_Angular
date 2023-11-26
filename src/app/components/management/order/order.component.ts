import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetAllOrderModel } from 'src/app/core/models/order/getAllOrderModel';
import { OrderService } from 'src/app/core/services/order/order.service';
import Swal from 'sweetalert2';
declare const $: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  getAllOrderModel: GetAllOrderModel[] = []
  orderDetail: GetAllOrderModel | null = null;

  constructor(
    private orderService: OrderService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllOrder();
  }

  getAllOrder() {
    this.orderService.getAllOrder().subscribe(response => {
      console.log(response.data)
      this.getAllOrderModel = response.data
      setTimeout(() => {
        $('#orderDataTable').DataTable({
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true,
          lengthMenu: [5, 10, 25],
          order: [[1, "desc"]]
        });
      }, 1);
    })
  }

  getOrderDetail(id: number) {
    this.orderService.getOrderDetail(id).subscribe(response => {
      this.orderDetail = response.data;
    })
  }

  changeOrderStatus(id: number, statusId: number) {
    if (statusId == 3) {
      Swal.fire({
        title: '<h4>Do you want to complete order?</h4>',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#20B939',
        confirmButtonText: 'Complete',
        cancelButtonText: 'Close'
        // cancelButtonColor:"#000"
      }).then(result => {
        if (result.value) {
          this.orderService
            .changeOrderStatus(id, statusId)
            .toPromise()
            .then((data) => {
              Swal.fire({
                icon: 'success',
                title: "Successfully!",
                showConfirmButton: false,
                timer: 1200,
                timerProgressBar: true

              });
              this.getAllOrder();
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
    else if (statusId == 4) {
      Swal.fire({
        title: '<h4>Do you want to cancel order?</h4>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f46a6a',
        confirmButtonText: 'Cancel',
        cancelButtonText: 'Close'
        // cancelButtonColor:"#000"
      }).then(result => {
        if (result.value) {
          this.orderService
            .changeOrderStatus(id, statusId)
            .toPromise()
            .then((data) => {
              Swal.fire({
                icon: 'success',
                title: "Successfully!",
                showConfirmButton: false,
                timer: 1200,
                timerProgressBar: true

              });
              this.getAllOrder();
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
}
