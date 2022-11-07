import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { ICartItem, IProductData } from '../types/DataType';
import Image from "next/image";
import { useCartContext } from '../contexts/CartContext';

interface ModalProps {
  product: IProductData
  showModal: boolean
  setShowModal: () => void
}

export function ModalComponent({ product, showModal, setShowModal }: ModalProps) {
  const [selectedSize, setSelectedSize] = useState('');
  
  const productPriceFormatted = 
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(product.price) 

  const { addItemToCart } = useCartContext();

  function handleSelectSize(size: string) {
    setSelectedSize(size)
  }

  function handleAddProductToCart() {
    if(product.available_sizes.length > 0 && selectedSize === '') {
      return toast.error(`Selecione um tamanho`, { autoClose: 1200, });
    }
    const formatProduct = {
      name: product.name,
      image_url: product.image_url,
      price: product.price,
      seller: product.seller,
      selected_size: selectedSize,
    } as ICartItem;

    addItemToCart(formatProduct);
    setSelectedSize('');
    toast.success(`${formatProduct.name} (${formatProduct.selected_size}) adicionado.`, { autoClose: 1200, });
    // setShowModal();
  }

  useEffect(() => {
    setSelectedSize('');
  }, [showModal]);

  return (
    <Modal
      size="lg"
      show={showModal}
      onHide={setShowModal}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          {product.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image className="rounded mx-auto d-block mb-4" src={`${product.image_url}`} alt="" width={150} height={150} />
        <p><span className="fw-bold">Descrição: </span>{product.details}</p>
        <p className="fw-bold">Valor: {productPriceFormatted}</p>
        <p className="lh-1">Vendido por: {product.seller}</p>
        <p className="lh-1">Esporte: {product.sport}</p>
        <p className="lh-1">Categoria: {product.type}</p>
        <div className="row d-flex align-self-baseline" style={{ height: '150px' }}>
          <p className="fw-bold">Tamanhos disponíveis</p>
          { product.available_sizes.length !== 0 && <span className="fw-bold text-danger">Selecione</span>}
          { product.available_sizes.length === 0 && <span className="fw-bold">ÚNICO</span>}
          <div>
            {
              product.available_sizes.length > 0 &&
              product.available_sizes.map(size => <span onClick={() => handleSelectSize(size)} role="checkbox" aria-checked key={size} className={`mx-1 rounded border border-dark p-2 ${selectedSize === size ? 'bg-secondary' : ''}`} style={{ width: '50px', cursor: 'pointer' }}>{size}</span>)
            }
          </div>
        </div> 
        <button onClick={handleAddProductToCart} type="button" className="btn btn-primary align-self-center w-100" style={{ height: '60px', border: "none" }}>Comprar</button>   
      </Modal.Body>
    </Modal>
  )
}