import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../interfaces/product.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient, private toastrService: ToastrService, private router: Router) { }

  getProducts(): Observable<any> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}