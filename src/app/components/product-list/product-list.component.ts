import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, computed, signal } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ProductCardComponent
  ]
})
export class ProductListComponent implements OnInit {

  public scrollClass: string = 'top-0';
  public position: number = 0;
  private _productsList = signal<Product[] | null>(null);
  public productsList = computed(() => this._productsList());


  @ViewChild('navbar') navbar!: ElementRef<HTMLInputElement>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductsList();

  }

  public getProductsList(): void {
    this.productService.getGamesList()
      .subscribe((result: Product[]) => {
        this._productsList.set(result.slice(0,45));
      });
  }

  @HostListener('document:scroll', ['$event'])
  public onViewportScroll() {

    const scrollAmount = window.scrollY || document.documentElement.scrollTop;

    if (scrollAmount > this.position) {
      this.scrollClass = '-top-24';
    } else {
      this.scrollClass = 'top-0';
    }

    this.position = scrollAmount





  }


}
