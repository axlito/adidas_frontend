import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Content, Product, ResponseData} from "../../interfaces/product";
import {RatingStarsComponent} from "../../components/rating-stars/rating-stars.component";
import {ProductCardComponent} from "../../components/product-card/product-card.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    RatingStarsComponent,
    ProductCardComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {

  #productService = inject(ProductService);
  colorDetail = signal<string>('');
  randomProducts = signal<Product[]>([]);
  careImages = [
    {key: Content.DoNotWash, value: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/A1.svg'},
    {key: Content.MachineWashCold, value: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/A3.svg'},
    {key: Content.MachineWashColdDelicateCycle, value: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/A4.svg'},
    {key: Content.MachineWashWarm, value: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/A5.svg'},
    {key: Content.DoNotBleach, value: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/B1.svg'},
    {key: Content.DoNotTumbleDry, value: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/C1.svg'},
    {key: Content.TumbleDryLowHeat, value: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/C2.svg'},
    {key: Content.DoNotIron, value: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/D1.svg'},
    {key: Content.TouchUpWithCoolIron, value: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/D2.svg'},
    {key: Content.TouchUpWithWarmIron, value: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/D4.svg'},
    {key: Content.DoNotDryClean, value: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/E1.svg'},
  ];

  product = signal<Product>({
    Image: '',
    Image1: '',
    Content: '',
    Keywords: '',
    Name: '',
    Category: '',
    Colors: '',
    Price: '',
    Promo_apply: '',
    Reviews: {votes: 1, rating: 1},
    Description_title: '',
    Description_content: '',
    Details: '',
    Care: {title: '', content: []},
    Color_detail: []
  });

  ngOnInit(): void {
    this.product.set(this.#productService.getCurrentProduct());
    this.getRandomProducts();
  }

  updateColorDetail(position: number) {
    this.colorDetail.set(this.product().Color_detail[position].color);
  }

  collapse(element: HTMLDivElement) {
    element.classList.toggle('active');
  }

  getRandomProducts() {
    this.#productService.getProductList(0)
      .subscribe((result: ResponseData) => {
        for (let i = 0; i < 4; i++) {
          this.randomProducts.update(value => [...value, result.products[i]]);
        }
      });
  }

  protected readonly Math = Math;
}
