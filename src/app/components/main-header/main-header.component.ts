import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'component-main-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent {

  products = input.required<number>();

}
