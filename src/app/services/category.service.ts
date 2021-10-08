import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends DatabaseService<Category> {
  constructor() {
    super('categories');
  }
}
