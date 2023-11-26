import { Component, OnInit } from '@angular/core';
import { GetAllOrderModel } from 'src/app/core/models/order/getAllOrderModel';
import { OrderService } from 'src/app/core/services/order/order.service';
declare const $: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  getAllOrderModel:GetAllOrderModel[]=[]

  constructor(
    private orderService:OrderService
  ) { }

  ngOnInit(): void {
    this.getAllOrder();
  }

  getAllOrder(){
    this.orderService.getAllOrder().subscribe(response=>{
      console.log(response.data)
      this.getAllOrderModel = response.data
      setTimeout(()=>{                          
        $('#orderDataTable').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true,
          lengthMenu : [5, 10, 25],
          order:[[1,"desc"]]
      } );
      }, 1);
    })
  }
}
