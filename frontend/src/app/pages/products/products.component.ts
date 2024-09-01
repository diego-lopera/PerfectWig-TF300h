import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: any[] = [];
  categories: string[] = [
    'EXTENSIONES SEMINATURALES', 'PELUCAS SEMINATURALES', 'COLETAS SEMINATURALES',
    'LÍNEA DE PRODUCTOS PERFECT', 'PELUCA HUMANAS', 'EXTENSIONES HUMANAS', 'FRONTALES HUMANOS'
  ];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      console.log('Productos recibidos:', data);
      this.products = data;
    });
  }
  getProductsByCategory(category: string) {
    return this.products.filter(product => product.categoria === category);
  }
}
