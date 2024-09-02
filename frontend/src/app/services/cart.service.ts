import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: any[] = [];
  total: number = 0;

  addToCart(product: Product, quantity: number = 1) {
    const existingProduct = this.cart.find(item => item.nombre === product.nombre);
    if (existingProduct) {
      existingProduct.cantidad += quantity;
      existingProduct.subtotal = existingProduct.cantidad * existingProduct.precio;
    } else {
      this.cart.push({ ...product, cantidad: quantity, subtotal: product.precio * quantity });
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
