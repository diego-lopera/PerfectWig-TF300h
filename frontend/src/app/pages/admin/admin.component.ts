import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  isProductModalOpen = false;
  productForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      descripcion: [''],
      categoria: ['', Validators.required],
      imagen: [null, Validators.required]
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.productForm.patchValue({
          imagen: base64String
        });
      };
      reader.readAsDataURL(file);
    }
  }


  openProductModal() {
    this.isProductModalOpen = true;
  }

  closeProductModal() {
    this.isProductModalOpen = false;
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value;
      console.log(newProduct);
      this.productService.addProduct(newProduct).subscribe({
        next: (response) => {
          console.log('Producto agregado:', response);
          this.closeProductModal();
        },
        error: (error) => {
          console.error('Error al agregar producto:', error);
        }
      });
    }
  }
}
