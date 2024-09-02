import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];
  categories: string[] = [
    'EXTENSIONES SEMINATURALES', 'PELUCAS SEMINATURALES', 'COLETAS SEMINATURALES',
    'LÍNEA DE PRODUCTOS PERFECT', 'PELUCA HUMANAS', 'EXTENSIONES HUMANAS', 'FRONTALES HUMANOS'
  ];
  constructor(private productService: ProductService, private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      console.log('Productos recibidos:', data);
      this.products = data;
    });
  }

  // getCategoryId(category: string): string {
  //   return category.toLowerCase().replace(/ /g, '-');
  // }

  getProductsByCategory(category: string) {
    return this.products.filter(product => product.categoria === category);
  }
}
