import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'shared-rating-stars',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './rating-stars.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingStarsComponent {

  @Input({ required: true }) product!: Product;

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

}
