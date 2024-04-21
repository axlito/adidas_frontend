import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pagination, Product, ResponseData } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  #httpClient = inject(HttpClient);
  #baseUrl: string = 'assets/DatosScraping.json';

  getProductList(page: number): Observable<ResponseData> {
    return this.#httpClient.get<Product[]>(this.#baseUrl)
      .pipe(
        map((result: Product[]) => {
          const max = (result.length % 48 === 0)
            ? result.length / 48
            : (Math.floor(result.length / 48));
          return {
            products: result.slice((page * 48), (page + 1) * 48),
            pagination: {
              prev: page === 0 ? null : page - 1,
              current: page,
              next: (page + 1) > max ? null : page + 1
            }
          }
        }));
  }

}
