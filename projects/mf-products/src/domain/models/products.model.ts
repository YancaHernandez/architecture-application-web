
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface CreateProduct extends Omit<Product, 'id'> { }

// UpdateProduct optional all but id is required
export interface UpdateProduct extends Partial<Product> { }

