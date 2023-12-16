import { Observable } from "rxjs";
import { ProductGateway } from "../gateways/product.gatewat";
import { Product } from "../models/products.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ProductDeleteUseCaseService {

  constructor(
    private readonly _productGateway: ProductGateway
  ) { }

  invoke(id: string): Observable<void> {
    return this._productGateway.deleteProduct(id);
  }
}
