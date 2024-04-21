import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, computed, inject, signal, viewChild } from '@angular/core';
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

  navbar = viewChild<ElementRef<HTMLImageElement>>('navbar');
  #productService = inject(ProductService);
  productsList = signal<Product[]>([]);
  pagination = signal<Pagination>({
    current: 0,
    next: 1,
    prev: null
  });

  ngOnInit(): void {
    this.getProductsList(0);
  }

  getProductsList(page: number | null): void {
    if (typeof page === 'number')
      this.#productService.getProductList(page)
        .subscribe((result: ResponseData) => {
          this.productsList.set(result.products);
          this.pagination.set(result.pagination);
        });
  }

}
