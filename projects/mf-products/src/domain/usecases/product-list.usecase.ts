import { Observable, of } from "rxjs";
import { ProductGateway } from "../gateways/product.gatewat";
import { Product } from "../models/products.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ProductListUseCaseService {

  constructor(
    private readonly _productGateway: ProductGateway
  ) { }

  invoke(): Observable<Product[]> {
    return this._productGateway.getProducts();
  }
}
