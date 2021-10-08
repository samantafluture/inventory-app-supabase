import { Category } from './../../../models/category.model';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NbToastrService } from '@nebular/theme';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  edit!: boolean;
  view: string = 'table';
  form = new FormGroup({});
  model!: Category;
  categories!: Category[] | null;
  fields!: FormlyFieldConfig[];

  constructor(
    private toastService: NbToastrService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService
      .getAll(10)
      .then((payload) => (this.categories = payload.data));
    this.buildForm();
    this.view = 'table';
    // this.cancel();
  }

  cancel() {
    this.view = 'table';
    this.form.reset();
  }

  buildForm() {
    this.fields = [
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
    this.model = new Category();
    this.edit = false;
    this.view = 'form';
  }

  save() {
    if (this.form.valid) {
      if (this.model.id) {
        this.update();
        return;
      }
      this.categoryService.add(this.model).then((payload) => {
        if (!payload.error) {
          this.categories?.push(payload.data![0]);
          this.view = 'table';
          this.message('Ok', 'Category added', 'success');
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
    this.categoryService.update(this.model).then(() => {
      const index = this.categories?.findIndex((c) => c.id == this.model.id);
      this.categories![index!] = this.model;
      this.view = 'table';
      this.message('Ok', 'Category updated', 'success');
    });
  }

  select(category: Category) {
    this.edit = true;
    this.view = 'form';
    this.model = category;
  }

  remove(category: Category) {
    this.categoryService.delete(category).then(() => {
      this.categories = this.arrayRemove(this.categories!, category.id);
      this.message('Ok', 'Category removed', 'success');
    });
  }

  arrayRemove(array: Category[], id: string) {
    return array.filter((c) => c.id != id);
  }

  private message(title: string, message: string, status: string) {
    this.toastService.show(title, message, {
      status: status,
      duration: 3000,
    });
  }
}
