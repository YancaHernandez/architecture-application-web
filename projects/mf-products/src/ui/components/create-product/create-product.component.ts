import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CreateProduct, } from '../../../domain/models/products.model';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';

@Component({
  selector: 'create-product',
  standalone: true,
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  imports: [
    ReactiveFormsModule,
  ],
  providers: []
})
export class CreateProductComponent implements OnInit {
  name = new FormControl('');
  description = new FormControl('');
  price = new FormControl(0);
  stock = new FormControl(0);

  @Output('uploadProducts') uploadProducts = new EventEmitter<void>();
  @Output('save') save = new EventEmitter<CreateProduct>();

  constructor() { }

  ngOnInit(): void { }

  guardar() {
    const product: CreateProduct = {
      name: this.name.value,
      description: this.description.value,
      price: Number(this.price.value),
      stock: Number(this.stock.value),
    }
    this.save.emit(product);
  }
}
