import Image from "next/image";
import { IProductData } from "../types/DataType";
import { useState } from "react";
import { ModalComponent } from "./ModalComponent";

interface ProductCardProps {
  product: IProductData
}

export function ProductCard({ product }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);

  const productPriceFormatted = 
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(product.price)  

  function handleShowModal() {
    setShowModal(false);
  }

  return (
    <>
      <div className="row m-2 py-4 bg-light rounded d-flex align-items-stretch justify-content-between border border-secondary" style={{ maxWidth: '200px', minHeight: '400px' }}>
        <div className="pb-4" style={{ maxWidth: '200px', height: '300px' }}>
          <div>
            <div className='d-flex justify-content-center mx-4 align-self-baseline'>
              <Image className="rounded mx-auto d-block mb-4" src={`${product.image_url}`} alt="" width={150} height={150} />
            </div>
            <h6>{product.name}</h6>
            <p>{productPriceFormatted}</p>      
          </div>            
        </div>
        <button onClick={() => setShowModal(true)} type="button" className="btn btn-primary align-self-center" style={{ height: '60px', border: "none" }}>Ver detalhes</button>
      </div>   
      <ModalComponent product={product} showModal={showModal} setShowModal={handleShowModal} />   
    </>
  )
}