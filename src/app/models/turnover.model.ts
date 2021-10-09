import { Product } from './product.models';
import { Base } from './base.model';

export class Turnover extends Base {
  amount!: number;
  type!: string;
  product_id!: string;
  created_at!: Date;
  products?: Product;
}
