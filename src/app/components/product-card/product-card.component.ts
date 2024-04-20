import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ColorDetail, Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit {

  @Input({ required: true }) product!: Product;
  @ViewChild('mainImage') mainImage!: ElementRef<HTMLInputElement>;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {

  }

  public handleReviews(product: Product) {

    let stars = [0, 0, 0, 0, 0];

    if (product.Reviews) {
      const value = Math.round(product.Reviews.rating);
      switch (value) {
        case 1:
          stars = [1, 0, 0, 0, 0];
          break;
        case 2:
          stars = [1, 1, 0, 0, 0];
          break;
        case 3:
          stars = [1, 1, 1, 0, 0];
          break;
        case 4:
          stars = [1, 1, 1, 1, 0];
          break;
        case 5:
          stars = [1, 1, 1, 1, 1];
          break;
      }
    }
    return stars
  }

  public previewImage(url: string) {
    const mainWidth = this.mainImage.nativeElement.width;
    this.renderer.setAttribute(this.mainImage.nativeElement, 'src', url)
    this.renderer.setAttribute(this.mainImage.nativeElement, 'width', `${mainWidth}px`)
  }

}
