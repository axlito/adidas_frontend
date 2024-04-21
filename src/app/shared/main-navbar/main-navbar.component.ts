import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';

@Component({
  selector: 'shared-main-navbar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavbarComponent {

  scrollClass: string = 'top-0';
  hideTop: number = 0;

  @HostListener('document:scroll')
  public onViewportScroll() {
    const scrollAmount = window.scrollY || document.documentElement.scrollTop;

    this.scrollClass = (scrollAmount > this.hideTop)
      ? '-top-24'
      : 'top-0';
    this.hideTop = scrollAmount;
  }

}
