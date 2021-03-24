import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { Product } from '../types';

interface ProductProviderProps {
  children: ReactNode;
}

interface ProductContextData {
  products: Product[];
}

const ProductContext = createContext<ProductContextData>({} as ProductContextData);

export function ProductProvider({ children }: ProductProviderProps): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(()=>{
    async function loadProducts() {
      const response = await api.get('/products');
      setProducts(response.data)
    }

    loadProducts();
  },[])

  return (
    <ProductContext.Provider
      value={{ products }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts(): ProductContextData {
  const context = useContext(ProductContext);

  return context;
}
