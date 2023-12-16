import { CreateProduct, Product, UpdateProduct } from "projects/mf-products/src/domain/models/products.model";
import { Observable, of, switchMap } from "rxjs";
import { ProductGateway } from "../../../domain/gateways/product.gatewat";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ProductApiService implements ProductGateway {
  constructor(
    private readonly http: HttpClient
  ) { }

  createProduct(product: CreateProduct): Observable<void> {
    return this.http.post<void>(`${environment.api}/product`, product);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get(`${environment.api}/product`).pipe(
      switchMap((products: any[]) => {
        const productsToReturn: Product[] = products.map(product => {
          return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
          }
        })
        return of(productsToReturn);
      })
    )
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get(`${environment.api}/product/${id}`).pipe(
      switchMap((product: any) => {
        const productToReturn: Product = {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
        }
        return of(productToReturn);
      })
    )
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.api}/product/${id}`);
  }

  updateProduct(productUpdate: UpdateProduct): Observable<void> {
    return this.http.put<void>(`${environment.api}/product/${productUpdate.id}`, productUpdate);
  }

}
