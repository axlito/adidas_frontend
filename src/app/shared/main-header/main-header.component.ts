import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'shared-main-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent {

  @Input({ required: true }) products?: number;

}
