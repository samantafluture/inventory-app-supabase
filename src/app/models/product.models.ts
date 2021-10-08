import { Base } from "./base.model";

export class Product extends Base {
  description!: string;
  selling_price!: number;
  minimum!: number;
  available_amount!: number;
  updated_at!: Date;
  category_id!: string;
}
