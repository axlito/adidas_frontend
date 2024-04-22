import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input, Signal, input} from '@angular/core';
import {Product} from '../../interfaces/product';

@Component({
  selector: 'component-rating-stars',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './rating-stars.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingStarsComponent {

  product = input.required<Product>();
  darkColor = input.required<string>();
  lightColor = input.required<string>();
  showVotes = input<boolean>(false);

  handleReviews(product: Product) {
    let stars = [0, 0, 0, 0, 0];
    if (product.Reviews) {
      const value = Math.floor(product.Reviews.rating);
      return stars.map((e, i) => i <= value ? 1 : e);
    }
    return stars;
  }

}
