import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product, ResponseData } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private responseData = signal<ResponseData | null>(null);
  private baseUrl: string = '../../assets/DatosScraping.json';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getProductList(): Observable<ResponseData> {
    return this.httpClient.get<Product[]>(this.baseUrl)
      .pipe(
        map(result => {
          return {
            products: result.slice(0, 48),
            pagination: {
              pageSize: 48,
              currentPage: 1,
              nextPage: 2,
              maxPages: Math.round(result.length / 48),
            }
          }
        })
      );
  }

}
