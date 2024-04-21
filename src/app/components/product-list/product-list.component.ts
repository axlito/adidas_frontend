import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, computed, signal } from '@angular/core';
import { Pagination, Product, ResponseData } from '../../interfaces/product';
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

  private _productsList = signal<Product[]>([]);
  public productsList = computed(() => this._productsList());
  private _pagination = signal<Pagination>({
    current: 0,
    next: 1,
    prev: null
  });
  public pagination = computed(() => this._pagination());


  @ViewChild('navbar') navbar!: ElementRef<HTMLInputElement>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductsList(0);
  }

  public getProductsList(page: number | null): void {
    if (typeof page === 'number')
      this.productService.getProductList(page)
        .subscribe((result: ResponseData) => {
          this._productsList.set(result.products);
          this._pagination.set(result.pagination);
        });
  }

}
