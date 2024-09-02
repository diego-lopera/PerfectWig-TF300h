import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentSlide = 0;

  prevSlide() {
    const slides = document.querySelectorAll('.carousel-item');
    if (this.currentSlide === 0) {
      this.currentSlide = slides.length - 1;
    } else {
      this.currentSlide--;
    }
    this.updateSlide();
  }

  nextSlide() {
    const slides = document.querySelectorAll('.carousel-item');
    if (this.currentSlide === slides.length - 1) {
      this.currentSlide = 0;
    } else {
      this.currentSlide++;
    }
    this.updateSlide();
  }

  updateSlide() {
    const slides = document.querySelectorAll('.carousel-inner') as NodeListOf<HTMLElement>;
    slides[0].style.transform = `translateX(-${this.currentSlide * 100}%)`;
  }
}
