import { Product } from './../models/product.models';
import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends DatabaseService<Product> {
  constructor() {
    super('products');
  }
}
