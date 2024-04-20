import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = '../../assets/DatosScraping.json';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getGamesList(): Observable<Product[]> {

    return this.httpClient.get<Product[]>(this.baseUrl);

  }

}
