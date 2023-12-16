import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ProductsComponent } from './ui/pages/products/products.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(ProductsComponent, {
  providers: [
    provideAnimations(), provideHttpClient()
  ]
});
