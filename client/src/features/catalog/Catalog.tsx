import { useState, useEffect, Fragment } from 'react';
import { Product } from '../../app/models/product';
import ProductList from "./ProductList";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(rsp => rsp.json())
      .then(data => setProducts(data))
  }, []);

  return (
    <Fragment>
      <ProductList products={products} />
    </Fragment>
  )
}