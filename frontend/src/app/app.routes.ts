import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


export const routes: Routes = [
    {path: 'inicio', component: HomeComponent},
    {path: 'productos', component: ProductsComponent},
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent}
];
