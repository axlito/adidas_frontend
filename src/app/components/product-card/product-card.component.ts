import {CommonModule, isPlatformBrowser} from '@angular/common';
import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, input, OnInit, PLATFORM_ID, Renderer2, viewChild} from '@angular/core';
import {Product} from '../../interfaces/product';
import {RatingStarsComponent} from "../rating-stars/rating-stars.component";
import {RouterLink} from "@angular/router";

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
  #imageWidth: number = 0;
  productUUID: string = '';

  ngOnInit(): void {
    const lastPos = this.product().Content.split('/');
    this.productUUID = lastPos[lastPos.length - 1].split('.')[0];
  }

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
