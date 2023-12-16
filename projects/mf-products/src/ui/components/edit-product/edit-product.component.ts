import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Product, UpdateProduct } from '../../../domain/models/products.model';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';

@Component({
  selector: 'edit-product',
  standalone: true,
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  imports: [
    ReactiveFormsModule,
  ]
})
export class EditProductComponent implements OnInit {

  @Input() product: Product;

  id = new FormControl('');
  name = new FormControl('');
  description = new FormControl('');
  price = new FormControl(0);
  stock = new FormControl(0);

  @Output('uploadProducts') uploadProducts = new EventEmitter<void>();
  @Output('edit') edit = new EventEmitter<UpdateProduct>();

  constructor() { }

  ngOnInit(): void {
    this.id.setValue(this.product.id);
    this.name.setValue(this.product.name);
    this.description.setValue(this.product.description);
    this.price.setValue(this.product.price);
    this.stock.setValue(this.product.stock);
  }

  editar() {
    const product: UpdateProduct = {
      id: this.id.value,
      name: this.name.value,
      description: this.description.value,
      price: Number(this.price.value),
      stock: Number(this.stock.value),
    }
    this.edit.emit(product);
  }
}
