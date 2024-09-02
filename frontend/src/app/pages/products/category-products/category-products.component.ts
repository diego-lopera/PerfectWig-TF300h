import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/products.service';
import { Product } from '../../../interfaces/product.interface';
import { CartService } from '../../../services/cart.service';
import { ToastMessageModule } from '../../../components/navigation/toast-message.module';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule, ToastMessageModule],
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {
  category: string = '';
  products: Product[] = [];
  showToast: boolean = false;
  toastMessage: string = '';

  categoryMap: { [key: string]: string } = {
    'extensiones-seminaturales': 'EXTENSIONES SEMINATURALES',
    'pelucas-seminaturales': 'PELUCAS SEMINATURALES',
    'coletas-seminaturales': 'COLETAS SEMINATURALES',
    'linea-perfect': 'LÍNEA DE PRODUCTOS PERFECT',
    'pelucas-humanas': 'PELUCAS HUMANAS',
    'extensiones-humanas': 'EXTENSIONES HUMANAS',
    'frontales-humanos': 'FRONTALES HUMANOS'
  };

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryKey = params.get('category') || '';
      this.category = this.categoryMap[categoryKey] || '';
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      console.log('Productos recibidos:', data);
      this.products = data.filter((product: Product) => product.categoria === this.category);
      console.log('Productos filtrados:', this.products);
    });
  }

  viewDetails(product: Product) {
    // Lógica para abrir el modal de detalles del producto
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.showToastMessage('Producto añadido al carrito de compras');
  }

  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

}
