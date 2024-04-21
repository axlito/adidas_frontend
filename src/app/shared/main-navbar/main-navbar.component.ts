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

  public scrollClass: string = 'top-0';
  public hideTop: number = 0;

  @HostListener('document:scroll')
  public onViewportScroll() {
    const scrollAmount = window.scrollY || document.documentElement.scrollTop;
    if (scrollAmount > this.hideTop) {
      this.scrollClass = '-top-24';
    } else {
      this.scrollClass = 'top-0';
    }
    this.hideTop = scrollAmount
  }


}
