import { CreateProduct, Product, UpdateProduct } from "projects/mf-products/src/domain/models/products.model";
import { Observable, of, throwError } from "rxjs";
import { ProductGateway } from "../../../domain/gateways/product.gatewat";
import { Injectable } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductLocalStorageService implements ProductGateway {

  constructor(

  ) { }

  createProduct(product: CreateProduct): Observable<void> {
    const products = this.getProductsLocalStorage();
    const newProduct: Product = this.createProductToProduct(product);
    products.push(newProduct);
    console.log('se guardo')
    this.saveProductsLocalStorage(products);
    return of(null);
  }

  getProducts(): Observable<Product[]> {
    const products = this.getProductsLocalStorage();
    return of(products)
  }

  getProduct(id: string): Observable<Product> {
    const products = this.getProductsLocalStorage();
    const product = products.find(p => p.id === id);
    if (product) {
      return of(product);
    } else {
      return throwError(() => 'Product not found')
    }
  }

  deleteProduct(id: string): Observable<void> {
    let products = this.getProductsLocalStorage();
    const product = products.find(p => p.id === id);
    if (product) {
      products = products.filter(p => p.id !== id);
      this.saveProductsLocalStorage(products);
      return of(null);
    } else {
      return throwError(() => 'Product not found')
    }
  }

  updateProduct(productUpdate: UpdateProduct): Observable<void> {
    let products = this.getProductsLocalStorage();
    let productNew = products.find(p => p.id === productUpdate.id);
    if (productNew) {
      productNew = {
        ...productNew,
        ...productUpdate
      }
      products = products.map(p => p.id === productUpdate.id ? productNew : p);
      this.saveProductsLocalStorage(products);
      return of(null);
    } else {
      return throwError(() => 'Product not found')
    }

  }

  private createProductToProduct(createProduct: CreateProduct): Product {
    const product = {
      id: uuidv4(),
      name: createProduct.name,
      description: createProduct.description,
      price: createProduct.price,
      stock: 0,
    };
    return product;
  }

  private getProductsLocalStorage(): Product[] {
    return JSON.parse(localStorage.getItem('db-products')) as Product[] || [] as Product[]
  }

  private saveProductsLocalStorage(products: Product[]) {
    localStorage.setItem('db-products', JSON.stringify(products));
  }
}
