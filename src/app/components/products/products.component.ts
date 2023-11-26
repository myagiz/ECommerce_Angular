import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product/product.service';
import { GetAllProductModel } from '../../../app/core/models/product/getAllProductModel';
import { OrderService } from 'src/app/core/services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { CreateOrderModel, ProductListForOrder } from 'src/app/core/models/order/createOrderModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  getAllProductModel: GetAllProductModel[] = []
  cartItems: any[] = [];
  isCompleted = true;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  viewProduct(item: any): void {
  }


  createOrder() {
    this.isCompleted = false;
    const productList: ProductListForOrder[] = this.cartItems.map(cartItem => ({
      productId: cartItem.id,
      amount: cartItem.quantity
    }));
  
    const orderModel: CreateOrderModel = {
      productList: productList
    };
  
    this.orderService
      .createOrder(orderModel)
      .toPromise()
      .then((data) => {
        this.isCompleted = true;
        this.toastrService.success(
          "Added successfully!",
          "E-Commerce"
        ).onHidden.toPromise().then(() => {
          this.cartItems = [];
        });
        this.router.navigate(['/orders']);
      })
      .catch((error) => {
        this.isCompleted = true;
        this.toastrService.error(
          "Error",
          "E-Commerce"
        );
      })
      .finally(() => {
      });
  }

  addToCart(item: any): void {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity++;
      existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
    } else {
      const newItem = {
        id: item.id,
        name: item.name,
        quantity: 1,
        unitPrice: item.unitPrice,
        totalPrice: item.unitPrice
      };
      this.cartItems.push(newItem);
    }
  }

  removeFromCart(itemId: number): void {
    const index = this.cartItems.findIndex(item => item.id === itemId);

    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  decreaseQuantity(itemId: number): void {
    const item = this.cartItems.find(cartItem => cartItem.id === itemId);

    if (item && item.quantity > 1) {
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    }
  }

  increaseQuantity(itemId: number): void {
    const item = this.cartItems.find(cartItem => cartItem.id === itemId);

    if (item) {
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }

  getAllProducts() {
    this.productService.getAllCustomers().subscribe(response => {
      this.getAllProductModel = response.data
    }, error => {
      this.getAllProductModel = []
    })
  }

  truncateText(text: string, limit: number): string {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    } else {
      return text;
    }
  }
}
