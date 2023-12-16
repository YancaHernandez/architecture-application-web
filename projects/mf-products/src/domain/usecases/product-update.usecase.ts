import { Observable } from "rxjs";
import { ProductGateway } from "../gateways/product.gatewat";
import { Product, UpdateProduct } from "../models/products.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ProductUpdateUseCaseService {

  constructor(
    private readonly _productGateway: ProductGateway
  ) { }

  invoke(product: UpdateProduct): Observable<void> {
    return this._productGateway.updateProduct(product);
  }
}
