import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../interfaces/login';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  isCartModalOpen = false;
  isLoginModalOpen = false;
  isUserModalOpen = false;
  isRegisterModalOpen = false;
  isLoggedIn = false;
  isAdmin = false;
  userName = '';
  userEmail = '';

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private userService = inject(UserService);

  loginForm = new FormGroup({
    correo: new FormControl('', Validators.required),
    contrasenia: new FormControl('', Validators.required)
  });

  registerForm = new FormGroup({
    correo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    documentoIdentidad: new FormControl('', Validators.required),
    contrasenia: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.isLoggedIn = this.authService.isLogged();
  }

  getCredentials() {
    const correo = this.loginForm.value.correo;
    const contrasenia = this.loginForm.value.contrasenia;

    if (typeof correo === 'string' && typeof contrasenia === 'string') {
      const validateCredentials: Login = {
        correo,
        contrasenia
      };
      return validateCredentials;
    }
    return null;
  }

  openCartModal() {
    this.isCartModalOpen = true;
  }

  closeCartModal() {
    this.isCartModalOpen = false;
  }

  openLoginModal() {
    this.isLoginModalOpen = true;
  }

  closeLoginModal() {
    this.isLoginModalOpen = false;
  }

  openUserModal() {
    this.isUserModalOpen = true;
  }

  closeUserModal() {
    this.isUserModalOpen = false;
  }

  openRegisterModal(event: Event) {
    event.preventDefault();
    this.isLoginModalOpen = false;
    this.isRegisterModalOpen = true;
  }

  closeRegisterModal() {
    this.isRegisterModalOpen = false;
  }

  handleUserClick() {
    if (this.isLoggedIn) {
      this.openUserModal();
    } else {
      this.openLoginModal();
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.authService.logout();
    this.userName = '';
    this.userEmail = '';
    this.closeUserModal();
  }

  onLoginSubmit() {
    const credentials = this.getCredentials();
    if (credentials) {
      this.authService.login(credentials).subscribe({
        next: (res: any) => {
          if (res && res.token) {
            localStorage.setItem('token', res.token);
            this.isAdmin = this.authService.isAdmin();
            this.isLoggedIn = true;
            this.authService.setLoggedInStatus(true);
            this.userName = res.user.nombre; // Actualiza el nombre del usuario
            this.userEmail = res.user.correo; // Actualiza el correo del usuario
            this.closeLoginModal();
          } else {
            console.error('Token no generado en la respuesta');
          }
        },
        error: (err) => {
          alert(err.error.message);
          this.loginForm.reset();
        }
      });
    }
  }

  navigateToAdminPage() {
    this.closeUserModal();
    window.location.href = '/admin';
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.userEmail = response.user.correo;
          this.userName = response.user.nombre;
          this.isLoggedIn = true;
          this.closeRegisterModal();
          this.openUserModal();
        },
        error: (err) => {
          alert(err.error.message);
          this.registerForm.reset();
        }
      });
    }
  }

  constructor(private router: Router) {}

  navigateToSection(section: string) {
    this.router.navigate(['/products'], { fragment: section });
  }

  get cart() {
    return this.cartService.cart;
  }

  get total() {
    return this.cartService.total;
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
