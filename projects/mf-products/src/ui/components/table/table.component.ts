import { CommonModule } from '@angular/common';
import { Product } from './../../../domain/models/products.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'table-products',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [CommonModule],
})
export class TableComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() showFormEdit = false;
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() editEvent = new EventEmitter<Product>();
  constructor(
  ) { }

  ngOnInit(): void {
  }

  delete(id: string) {
    this.deleteEvent.emit(id);
  }

  edit(product: Product) {
    this.editEvent.emit(product);
  }

}
