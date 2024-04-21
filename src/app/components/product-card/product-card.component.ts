import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, PLATFORM_ID, Renderer2, inject, input, viewChild } from '@angular/core';
import { Product } from '../../interfaces/product';
import { RatingStarsComponent } from "../../shared/rating-stars/rating-stars.component";

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RatingStarsComponent
  ]
})
export class ProductCardComponent implements AfterViewInit {

  product = input.required<Product>();
  mainImage = viewChild<ElementRef<HTMLImageElement>>('mainImage');
  #renderer = inject(Renderer2);
  #platformId = inject(PLATFORM_ID);
  #imageWidth: number = 0;

  @HostListener('window:resize')
  ngAfterViewInit(): void {
    this.#renderer.setAttribute(this.mainImage()!.nativeElement, 'width', '100%');
    setTimeout(() => {
      this.#imageWidth = this.mainImage()!.nativeElement.width;
    }, 50);
  }

  previewImage(url: string) {
    if (!this.isMobile() && url !== "") {
      this.#renderer.setAttribute(this.mainImage()!.nativeElement, 'src', url);
      this.#renderer.setAttribute(this.mainImage()!.nativeElement, 'width', `${this.#imageWidth}px`);
    }
  }

  isMobile(): boolean {
    return isPlatformBrowser(this.#platformId)
      ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      : false;
  }

}
