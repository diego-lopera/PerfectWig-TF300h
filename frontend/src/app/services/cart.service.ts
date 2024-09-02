import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: any[] = [];
  total: number = 0;

  addToCart(product: Product) {
    const existingProduct = this.cart.find(item => item.nombre === product.nombre);
    if (existingProduct) {
      existingProduct.cantidad += 1;
      existingProduct.subtotal = existingProduct.cantidad * existingProduct.precio;
    } else {
      this.cart.push({ ...product, cantidad: 1, subtotal: product.precio });
    }
    this.calculateTotal();
  }

  clearCart() {
    this.cart = [];
    this.total = 0;
  }

  calculateTotal() {
    this.total = this.cart.reduce((acc, item) => acc + item.subtotal, 0);
  }
}
