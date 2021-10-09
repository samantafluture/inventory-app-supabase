import { NbToastrService } from '@nebular/theme';
import { TurnoverService } from './../../../services/turnover.service';
import { ProductService } from './../../../services/product.service';
import { CategoryService } from './../../../services/category.service';
import { Product } from './../../../models/product.models';
import { Category } from './../../../models/category.model';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Turnover } from './../../../models/turnover.model';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-turnover',
  templateUrl: './turnover.component.html',
  styleUrls: ['./turnover.component.scss'],
})
export class TurnoverComponent implements OnInit {
  edit!: boolean;
  view: string = 'table';
  form = new FormGroup({});
  model!: Turnover;
  fields!: FormlyFieldConfig[];

  categories!: Category[] | null;
  selectedCategory!: Category;
  products!: Product[] | null;
  selectedProduct!: Product;
  turnover: any;

  type: any[] = [
    { label: 'In', value: 'In' },
    { label: 'Out', value: 'Out' },
  ];

  amount!: number;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private turnoverService: TurnoverService,
    private toastrService: NbToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    this.categories = await this.categoryService.getAll();
    this.buildForm();
  }

  buildForm() {
    this.fields = [
      {
        key: 'type',
        focus: true,
        type: 'select',
        templateOptions: {
          label: 'Type',
          type: 'text',
          placeholder: 'Select a type',
          require: true,
          options: this.type,
        },
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-6',
            key: 'created_at',
            type: 'input',
            templateOptions: {
              label: 'Turnover Date',
              type: 'date',
            },
          },
          {
            className: 'col-6',
            key: 'amount',
            type: 'input',
            templateOptions: {
              label: 'Amount',
              type: 'number',
              min: 1,
              required: true,
            },
          },
        ],
      },
    ];
  }

  async filterByCategory() {
    this.products = await this.productService.getByCategory(
      this.selectedCategory.id
    );
  }

  add() {
    this.form.reset();
    this.model = new Turnover();
    this.edit = false;
    this.model.product_id = this.selectedProduct.id;
    this.model.amount = 1;
    this.model.created_at = new Date();
    this.view = 'form';
  }

  update() {
    this.turnoverService.update(this.model);
    this.view = 'table';
    this.message('Ok', 'Stock Turnover with Success', 'success');
  }

  select(turnover: Turnover) {
    this.model = turnover;
    this.view = 'form';
    this.edit = true;
    this.amount = turnover.amount;
  }

  cancel() {
    this.view = 'table';
  }

  save() {
    if (this.form.valid) {
      if (this.model.id) {
        this.update();
        return;
      }

      this.turnoverService.add(this.model).then((data) => {
        this.cancel();
        if (!data.error) {
          this.model = data.data![0];
          this.model.products = this.selectedProduct;
          // TODO inventory()
          this.turnover.push(...data.data!);
          this.message('Ok', 'Turnover Saved', 'success');
        } else {
          this.message(
            'Error',
            `Error while saving. Details: ${data.error.message}`,
            'danger'
          );
        }
      });
    }
  }

  remove(turnover: Turnover) {
    this.model = turnover;
    this.amount = this.model.amount;
    this.turnoverService.delete(turnover).then(() => {
      // TODO inventory()
      this.turnover = this.arrayRemove(this.turnover, turnover.id);
      this.message('Removed', `Stock Turnover Removed`, 'danger');
    });
  }

  arrayRemove(array: Turnover[], id: string) {
    return array.filter((c) => c.id != id);
  }

  private message(title: string, message: string, status: string) {
    this.toastrService.show(title, message, {
      status: status,
      duration: 3000,
    });
  }
}
