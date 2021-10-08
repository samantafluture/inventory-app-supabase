import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Product } from 'src/app/models/product.models';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  edit!: boolean;
  view: string = 'table';
  form = new FormGroup({});
  model!: Product;
  products!: Product[] | null;
  categories!: Category[] | null;
  fields!: FormlyFieldConfig[];

  constructor(
    private toastService: NbToastrService,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  async ngOnInit(): Promise<void> {
    this.productService
      .getAll(10)
      .then((payload) => (this.products = payload.data));
    const { data } = await this.categoryService.getAll();
    this.categories = data;
    this.buildForm();
    this.view = 'table';
  }

  cancel() {
    this.view = 'table';
    this.form.reset();
  }

  buildForm() {
    this.fields = [
      {
        key: 'category_id',
        type: 'select',
        templateOptions: {
          label: 'Category',
          type: 'text',
          placeholder: 'Select a category',
          required: true,
          options: this.categories?.map((category) => ({
            label: category.name,
            value: category.id,
          })),
        },
      },
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'Name',
          type: 'text',
          placeholder: 'Type a name',
          required: true,
        },
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-4',
            key: 'selling_price',
            type: 'input',
            templateOptions: {
              label: 'Selling Price',
              type: 'number',
              placeholder: '0,00',
              required: true,
            },
          },
          {
            className: 'col-4',
            key: 'available_amount',
            type: 'input',
            templateOptions: {
              label: 'Available Amount',
              type: 'number',
              min: 0,
              required: true,
            },
          },
          {
            className: 'col-4',
            key: 'minimum',
            type: 'input',
            templateOptions: {
              label: 'Minimum Amount',
              type: 'number',
              min: 0,
              required: true,
            },
          },
        ],
      },
      {
        key: 'description',
        type: 'textarea',
        templateOptions: {
          label: 'Description',
          maxLength: 100,
          rows: 5,
        },
      },
    ];
  }

  add() {
    this.form.reset();
    this.model = new Product();
    this.edit = false;
    this.view = 'form';
  }

  save() {
    if (this.form.valid) {
      if (this.model.id) {
        this.update();
        return;
      }
      this.productService.add(this.model).then((payload) => {
        if (!payload.error) {
          this.products?.push(payload.data![0]);
          this.view = 'table';
          this.message('Ok', 'Product added', 'success');
        } else {
          this.message(
            'Error',
            `Error on saving data. Details: ${payload.error.message}`,
            'success'
          );
        }
      });
    }
  }

  update() {
    this.productService.update(this.model).then(() => {
      const index = this.products?.findIndex((c) => c.id == this.model.id);
      this.products![index!] = this.model;
      this.view = 'table';
      this.message('Ok', 'Product updated', 'success');
    });
  }

  select(product: Product) {
    this.edit = true;
    this.view = 'form';
    this.model = product;
  }

  remove(product: Product) {
    this.productService.delete(product).then(() => {
      this.products = this.arrayRemove(this.products!, product.id);
      this.message('Ok', 'Product removed', 'success');
    });
  }

  arrayRemove(array: Product[], id: string) {
    return array.filter((c) => c.id != id);
  }

  private message(title: string, message: string, status: string) {
    this.toastService.show(title, message, {
      status: status,
      duration: 3000,
    });
  }
}
