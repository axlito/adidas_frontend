import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
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
export class ProductCardComponent implements OnInit {

  @Input({ required: true }) product!: Product;
  @ViewChild('mainImage') mainImage!: ElementRef<HTMLInputElement>;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {

  }

  public previewImage(url: string) {
    const mainWidth = this.mainImage.nativeElement.width;
    if (url !== "") {
      this.renderer.setAttribute(this.mainImage.nativeElement, 'src', url)
      this.renderer.setAttribute(this.mainImage.nativeElement, 'width', `${mainWidth}px`)
    }
  }

}
