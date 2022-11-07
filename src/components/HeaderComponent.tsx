import Image from 'next/image';
import LogoImg from '../assets/logo.svg';
import { Bag } from "phosphor-react";
import { useCartContext } from '../contexts/CartContext';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { ICartItem } from '../types/DataType';
import { v4 as uuidv4 } from 'uuid';

export function HeaderComponent() {
  const [smShow, setSmShow] = useState(false);
  const [totalValue, setTotalValue] = useState('');
  const { cartItems, removeItemFromCart, addItemToCart } = useCartContext();

  function calcTotal() {
    const total = cartItems.reduce((total, item) => (item.quantity * item.price) + total, 0);
    const totalPriceFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(total);
    setTotalValue(totalPriceFormatted);
  }

  function addItem(item: ICartItem) {
    addItemToCart(item);
  }
  
  function removeItem(item: ICartItem) {
    removeItemFromCart(item);
    
  }

  function handleShowModal() {
    if(cartItems.length > 0) {
      setSmShow(true);
    }
  }

  useEffect(() => {
    calcTotal();
    if(cartItems.length === 0) {
      setSmShow(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeItemFromCart, addItemToCart]);

  return (
    <header className="py-4" style={{backgroundColor: '#EEEEEE'}}>
      <div className='d-flex justify-content-between mx-4 align-items-center'>
        <Image src={LogoImg} width={100} alt='Logotipo da empresa Coopercarga' />  

        <OverlayTrigger
          key={"left"}
          placement={"left"}
          overlay={
            <Tooltip id={`left`}>
              Items do carrinho
            </Tooltip>
          }
        >
        <button onClick={handleShowModal} className='position-relative pb-2' style={{ border: 'none', cursor: `${cartItems.length > 0 ? 'pointer' : 'default'}` }}>
          <Bag size={42} />
          {
            cartItems.length > 0 &&
            <span className='bg-danger text-white rounded-5 position-absolute bottom-0 end-0 border border-danger px-1'>{cartItems.length}</span>
          }
        </button>   
        </OverlayTrigger>  
      </div>
      <Modal
        size="lg"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        style={{ right: 0 }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Items no carrinho
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            cartItems.map(item => {
              const productPriceFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(item.price)
              return (
                <div key={uuidv4()} className="d-flex justify-content-between border-bottom border-secondary my-1 py-2 bg-light flex-wrap">
                  <div className="d-flex flex-row justify-content-start align-items-center flex-grow-1">
                    <Image className="rounded mx-2" src={`${item.image_url}`} alt="" width={50} height={50} />
                    <span className="mx-2">{item.name}</span>
                    <span>{productPriceFormatted}</span>
                    <span>({item.selected_size})</span>
                  </div>
                  <div className="d-flex align-items-center m-auto flex-shrink-1">
                    <button className="btn btn-primary mx-4" onClick={() => addItem(item)}>+</button>
                    <span className="mx-1">x {item.quantity}</span>
                    <button className="btn btn-primary mx-4" onClick={() => removeItem(item)}>-</button>
                  </div>
                </div>
              )
            })
          }
          <div className="d-flex justify-content-end">
            <p>
              <span>Total:</span>
              <span className="fw-bold">{totalValue}</span>
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </header>
  );
}