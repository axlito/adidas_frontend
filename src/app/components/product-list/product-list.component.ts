import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, computed, signal } from '@angular/core';
import { Product, ResponseData } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from "../product-card/product-card.component";
import { MainHeaderComponent } from "../../shared/main-header/main-header.component";

@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ProductCardComponent,
        MainHeaderComponent
    ]
})
export class ProductListComponent implements OnInit {

  private _productsList = signal<Product[] | null>(null);
  public productsList = computed(() => this._productsList());


  @ViewChild('navbar') navbar!: ElementRef<HTMLInputElement>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductsList();

  }

  public getProductsList(): void {
    this.productService.getProductList()
      .subscribe((result: ResponseData) => {
        this._productsList.set(result.products);
      });
  }


}
