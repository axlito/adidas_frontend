import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { MainNavbarComponent } from "./components/main-navbar/main-navbar.component";
import {MainFooterComponent} from "./components/main-footer/main-footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, ProductListComponent, MainNavbarComponent, MainFooterComponent]
})
export class AppComponent {
  title = 'adidas_frontend';
}
