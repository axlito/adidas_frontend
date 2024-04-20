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
        map(result => {
          return {
            products: result.slice((page * 48), (page * 48) + 48),
            pagination: {
              prev: Math.max(0, (page - 1)),
              current: page,
              next: (page + 1),
              max: (Math.round(result.length / 48))
            }
          }
        })
      );
  }

}
