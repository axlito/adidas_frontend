import { CommonModule, isPlatformBrowser } from '@angular/common';
import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, PLATFORM_ID, Renderer2, inject, input, viewChild, OnInit} from '@angular/core';
import { Product } from '../../interfaces/product';
import { RatingStarsComponent } from "../rating-stars/rating-stars.component";
import {RouterLink} from "@angular/router";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'component-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RatingStarsComponent,
    RouterLink
  ]
})
export class ProductCardComponent implements OnInit, AfterViewInit {

  product = input.required<Product>();
  mainImage = viewChild<ElementRef<HTMLImageElement>>('mainImage');
  showColors = input<boolean>(true);
  #renderer = inject(Renderer2);
  #platformId = inject(PLATFORM_ID);
  #productService = inject(ProductService);
  #imageWidth: number = 0;
  productUUID: string = '';

  ngOnInit(): void {
    this.productUUID = this.product().Content.slice(this.product().Content.length - 11, this.product().Content.length - 5);
  }

  @HostListener('window:resize')
  ngAfterViewInit(): void {
    this.#renderer.setAttribute(this.mainImage()!.nativeElement, 'width', '100%');
    setTimeout(() => {
      this.#imageWidth = this.mainImage()!.nativeElement.width;
    }, 50);
  }

  setProduct(newValue: Product): void {
    this.#productService.updateCurrentProduct(newValue);
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
