import { CreateProduct, Product, UpdateProduct } from './../../../domain/models/products.model';
import { ProductListUseCaseService } from './../../../domain/usecases/product-list.usecase';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { ProductGateway } from '../../../domain/gateways/product.gatewat';
import { Subscription, first, take } from 'rxjs';
import { CreateProductComponent } from '../../components/create-product/create-product.component';
import { ProductApiService } from 'projects/mf-products/src/infrastructure/driver-adapter/products-api/product-api.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductDeleteUseCaseService } from 'projects/mf-products/src/domain/usecases/product-delete.usecase';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from '../../components/edit-product/edit-product.component';
import { ProductCreateUseCaseService } from 'projects/mf-products/src/domain/usecases/product-create.usecase';
import { ProductUpdateUseCaseService } from 'projects/mf-products/src/domain/usecases/product-update.usecase';
import { ProductLocalStorageService } from 'projects/mf-products/src/infrastructure/driver-adapter/products-localstorage/product-localStorage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [
    CommonModule,
    HttpClientModule,
    TableComponent,
    CreateProductComponent,
    EditProductComponent
  ],
  providers: [
    ProductListUseCaseService,
    ProductCreateUseCaseService,
    ProductUpdateUseCaseService,
    ProductDeleteUseCaseService,
    {
      provide: ProductGateway,
      useClass: ProductLocalStorageService
    }
  ],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  showFormEdit = false;
  productToEdit: Product | null = null;
  constructor(
    private readonly _productListUseCaseService: ProductListUseCaseService,
    private readonly _productCreateUseCaseService: ProductCreateUseCaseService,
    private readonly _productUpdateUseCaseService: ProductUpdateUseCaseService,
    private readonly _productDeleteUseCaseService: ProductDeleteUseCaseService,
  ) { }

  ngOnInit(): void {
    this.uploadProducts();
  }

  uploadProducts() {
    this._productListUseCaseService.invoke().pipe(take(1)).subscribe({
      next: (products) => {
        this.products = products;
        this.showFormEdit = false;
      }
    })
  }

  save(productCreate: CreateProduct) {
    this._productCreateUseCaseService.invoke(productCreate).pipe(first()).subscribe({
      next: (data) => this.uploadProducts()
    });
  }

  edit(updateProduct: UpdateProduct) {
    this._productUpdateUseCaseService.invoke(updateProduct).pipe(first()).subscribe({
      next: (data) => this.uploadProducts()
    });
  }

  delete(id: string) {
    this._productDeleteUseCaseService.invoke(id).subscribe({
      next: () => this.uploadProducts()
    })
  }

  editShow(product: Product) {
    this.showFormEdit = true;
    this.productToEdit = product;
  }
}
