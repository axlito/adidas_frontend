import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";

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
export class ProductListComponent {

  public scrollClass: string = 'top-0';
  public position: number = 0;
  public items = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  @ViewChild('navbar') navbar!: ElementRef<HTMLInputElement>;

  constructor() { }


  @HostListener('document:scroll', ['$event'])
  public onViewportScroll() {

    const scrollAmount = window.scrollY || document.documentElement.scrollTop;

    if (scrollAmount > this.position) {
      this.scrollClass = '-top-16';
    } else {
      this.scrollClass = 'top-0';
    }

    this.position = scrollAmount





  }


}
