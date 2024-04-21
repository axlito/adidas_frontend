import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, Input, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
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

  @Input({ required: true }) product!: Product;
  @ViewChild('mainImage') mainImage!: ElementRef<HTMLInputElement>;
  private imageWidth: number = 0;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  @HostListener('window:resize')
  ngAfterViewInit(): void {
    this.renderer.setAttribute(this.mainImage.nativeElement, 'width', '100%');
    setTimeout(() => {
      this.imageWidth = this.mainImage.nativeElement.width;
    }, 50)
  }

  public previewImage(url: string) {
    if (!this.isMobile() && url !== "") {
      this.renderer.setAttribute(this.mainImage.nativeElement, 'src', url)
      this.renderer.setAttribute(this.mainImage.nativeElement, 'width', `${this.imageWidth}px`)
    }
  }

  public isMobile(): boolean {
    return isPlatformBrowser(this.platformId)
      ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      : false;
  }

}
