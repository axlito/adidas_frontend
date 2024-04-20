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


  //
  // REMEMBER TO FIX HOVER WIDTH WHEN WINDOW CHANGE
  //
  public previewImage(url: string) {
    if (!this.isMobile() && url !== "") {
      const mainWidth = this.mainImage.nativeElement.width;
      this.renderer.setAttribute(this.mainImage.nativeElement, 'src', url)
      this.renderer.setAttribute(this.mainImage.nativeElement, 'width', `${mainWidth}px`)
    }
  }

  public isMobile(): boolean {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return true
    } else {
      return false
    }
  }

}
