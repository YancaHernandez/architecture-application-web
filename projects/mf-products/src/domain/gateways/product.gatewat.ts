import { Product, UpdateProduct, CreateProduct } from '../models/products.model';
import { BehaviorSubject, Observable } from "rxjs";

export abstract class ProductGateway {
  abstract createProduct(product: CreateProduct): Observable<void>
  abstract getProducts(): Observable<Product[]>
  abstract getProduct(id: string): Observable<Product>
  abstract deleteProduct(id: string): Observable<void>
  abstract updateProduct(product: UpdateProduct): Observable<void>
}
