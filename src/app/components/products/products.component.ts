import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product/product.service';
import { GetAllProductModel } from '../../../app/core/models/product/getAllProductModel';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  getAllProductModel: GetAllProductModel[] = []
  constructor(
    private productService: ProductService
  ) { }

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
