import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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

  public items = [0,0,0,0,0,0,0,0,0,0];

}
