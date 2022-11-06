import { useEffect, useState } from "react";
import { Data } from "../types/DataType";
import { ProductCard } from "./ProductCard"

interface HomeProps {
  products: Data
  filter: string
}

export function Catalog({ products, filter }: HomeProps) {
  const[filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if(filter !== '' && filter !== undefined) {      
      setFilteredProducts(prevState => {
        return prevState.filter(product => product.sport.toLowerCase() === filter.toLowerCase())
      });
    } 
  }, [filter]);

  return (
    <div className="row d-flex justify-content-center">
    {
      filteredProducts.map(product => {
        return (
          <ProductCard key={product.name} product={product} />
        )
      })
    }
    </div>
  )
}