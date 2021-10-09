import { Turnover } from '../models/turnover.model';
import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class TurnoverService extends DatabaseService<Turnover> {
  constructor() {
    super('stock-turnover');
  }

  async getLastStockTurnover(productId: string) {
    const data = await this.supabase
      .from<Turnover>(this.table)
      .select(
        `
        *,
        products(*)
        `
      )
      .eq('product_id', productId)
      .order('created_at', { ascending: false });
    return data;
  }
}
