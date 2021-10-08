export interface CrudI<T> {
  get(t: T): any;
  getAll(limit?: number): any;
  add(t: T): any;
  update(t: T): any;
  delete(t: T): any;
}
