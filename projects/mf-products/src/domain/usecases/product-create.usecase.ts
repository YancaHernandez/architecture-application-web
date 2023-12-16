import { Observable } from "rxjs";
import { ProductGateway } from "../gateways/product.gatewat";
import { CreateProduct, Product } from "../models/products.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ProductCreateUseCaseService {

  constructor(
    private readonly _productGateway: ProductGateway
  ) { }

  invoke(product: CreateProduct): Observable<void> {
    return this._productGateway.createProduct(product)
  }
}
