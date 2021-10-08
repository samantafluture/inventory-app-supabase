import { Base } from './base.model';

export class StockTurnover extends Base {
  amount!: number;
  type!: string;
  product_id!: string;
}
