import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GetAllProductModel } from 'src/app/core/models/product/getAllProductModel';
import { ProductService } from 'src/app/core/services/product/product.service';
declare const $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {
  @ViewChild('dTable', { static: false }) dataTable: any
  getAllProductModel: GetAllProductModel[] = []


  constructor(private productService:ProductService) { }

  ngAfterViewInit(): void {
    // $(this.dataTable.nativeElement).DataTable();
    $(document).ready(() => {
      $(this.dataTable.nativeElement).DataTable();
    });

  }
  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts() {
    this.productService.getAllCustomers().subscribe(response => {
      this.getAllProductModel = response.data
    }, error => {
      this.getAllProductModel = []
    })
  }

}
