import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pagination, Product, ResponseData } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl: string = '../../assets/DatosScraping.json';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getProductList(page: number): Observable<ResponseData> {
    return this.httpClient.get<Product[]>(this.baseUrl)
      .pipe(
        map((result: Product[]) => {
          /*
          0 => 0 * 48, (0 + 1) * 48 [0, 48]
          1 => 1 * 48, (1 + 1) * 48 [48, 96]
          2 => 2 * 48, (2 + 1) * 48 [96, 144]
          3 => 3 * 48, (3 + 1) * 48 [0, 48]
          4 => 4 * 48, (4 + 1) * 48 [0, 48]
          */
          const max = (result.length % 48 === 0)
            ? result.length / 48
            : (Math.floor(result.length / 48)) + 1
          return {
            products: result.slice((page * 48), (page + 1) * 48),
            pagination: {
              prev: page === 0 ? null : page - 1,
              current: page,
              next: (page + 1) > max ? null : page + 1
            }
          }
        })
      );
  }

}
