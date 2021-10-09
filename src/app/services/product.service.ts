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

  async getByCategory(categoryId: string) {
    const data = await this.supabase
      .from<Product>(this.table)
      .select('*')
      .eq('category_id', categoryId)
      .order('name');
    return data.data;
  }
}
