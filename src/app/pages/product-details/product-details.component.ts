import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Content, Product, ResponseData} from "../../interfaces/product";
import {RatingStarsComponent} from "../../components/rating-stars/rating-stars.component";
import {ProductCardComponent} from "../../components/product-card/product-card.component";
import {ActivatedRoute} from "@angular/router";

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
  #activatedRoute = inject(ActivatedRoute);
  colorDetail = signal<string>('');
  randomProducts = signal<Product[]>([]);
  careImages: { [k in Content]: string } = {
    [Content.DoNotWash]: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/A1.svg',
    [Content.MachineWashCold]: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/A3.svg',
    [Content.MachineWashColdDelicateCycle]: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/A4.svg',
    [Content.MachineWashWarm]: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/A5.svg',
    [Content.DoNotBleach]: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/B1.svg',
    [Content.DoNotTumbleDry]: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/C1.svg',
    [Content.TumbleDryLowHeat]: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/C2.svg',
    [Content.DoNotIron]: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/D1.svg',
    [Content.TouchUpWithCoolIron]: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/D2.svg',
    [Content.TouchUpWithWarmIron]: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/D4.svg',
    [Content.DoNotDryClean]: 'https://www.adidas.com/glass/react/c72bc0c/assets/img/washing-instructions/E1.svg',
  };
  uiState = signal<'LOADING' | 'READY' | '404'>('LOADING');
  product = signal<Product | null>(null);

  ngOnInit(): void {

    this.#activatedRoute.params.subscribe((params) => {
      this.#productService.getProduct(params['id'])
        .subscribe((result: Product | null) => {
          if (result) {
            this.product.set(result);
            this.uiState.set('READY');
          } else {
            this.uiState.set('404');
          }
        });
    });

    this.getRandomProducts();
  }

  updateColorDetail(position: number) {
    this.colorDetail.set(this.product()?.Color_detail?.[position]?.color ?? '');
  }

  collapse(element: HTMLDivElement) {
    element.classList.toggle('active');
  }

  getRandomProducts() {
    this.#productService.getProductList(0)
      .subscribe((result: ResponseData) => {
        for (let i = 0; i < 4; i++) {
          const randomNumber = Math.floor(Math.random() * (48 - +1) + 1);
          this.randomProducts.update(value => [...value, result.products[randomNumber]]);
        }
      });
  }
}
