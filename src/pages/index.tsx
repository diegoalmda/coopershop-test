import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head'
import { getAllProducts, getFilteredProducts } from '../services/products';
import { GetStaticProps } from 'next';
import { Data } from '../types/DataType';
// import { HeaderComponent } from '../components/HeaderComponent';
import { ProductCard } from '../components/ProductCard';
import Image from 'next/image';
import LogoImg from '../assets/logo.svg';
import { Bag } from "phosphor-react";
import { LinkedinLogo } from "phosphor-react";
import Form from 'react-bootstrap/Form';
// import { Catalog } from '../components/catalog';
import { useRouter } from 'next/router';
import React, { Suspense } from 'react';
import { useCartContext } from '../contexts/CartContext';
// const Catalog = React.lazy(() => import('../components/catalog').then(({ Catalog }) => ({ default: Catalog })));

interface HomeProps {
  categories: string[];
}

export default function Home({ categories }: HomeProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const[products, setProducts] = useState<Data>([] as Data);
  // const router = useRouter();

  // const { cartItems } = useCartContext();

  // console.log(cartItems)

  function handleSelectedCategory(category: string) {
    // console.log(router)
    // router.push(`${router.pathname}?filter=${category}`, undefined, { shallow: true })
    setSelectedCategory(category)
  }

  useEffect(() => {
    async function getProducts(filter: string) {
      if(filter !== '') {
        const data = await getFilteredProducts(filter) as Data;
        setProducts(data);
      } else {
        const data = await getAllProducts() as Data;
        setProducts(data);
      }
    }

    getProducts(selectedCategory);
    
  },[selectedCategory]);

  return (
    <Fragment>
      <Head>
        <title>Cooper Shop</title>
        <meta name="description" content="Loja da coopercarga" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <header className="py-4" style={{backgroundColor: '#EEEEEE'}}>
        <div className='d-flex justify-content-between mx-4 align-items-center'>
          <Image src={LogoImg} width={100} alt='Logotipo da empresa Coopercarga' />       
          <Bag size={32} />    
        </div>
      </header>
    {
      !products ? <p>Carregando...</p> : 
      <div>
        <main className="container" style={{ marginBottom: '8rem' }}>
          <div>
          <Form.Group className="mb-3 d-flex justify-content-end align-items-center">
            <Form.Label className='me-3 fw-bold'>Filtrar</Form.Label>
            <Form.Select 
              className='my-4' 
              style={{ width: '200px' }}
              value={selectedCategory}
              onChange={(e) => handleSelectedCategory(e.target.value)}
            >
              <option value="">Todos</option>
              {
                categories.map(category => <option key={category} value={category}>{category}</option>)
              }
            </Form.Select>
          </Form.Group>
          </div>
          <div className="row d-flex justify-content-lg-start justify-content-center">
            {
              products.length === 0 ? <div>Carregando...</div> :
              products.map(product => {
                return (
                  <ProductCard key={product.name} product={product} />
                )
              })
            }
          </div>
          {/* <Suspense fallback={<div>Carregando...</div>}>
            <Catalog 
              products={products}
              filter={selectedCategory}
            />
          </Suspense> */}
        </main>

        <footer className="py-4 fixed-bottom d-flex align-content-center" style={{backgroundColor: '#EEEEEE'}}>
          <p className='m-auto'>
            Desenvolvido por Diego Almeida
            <span className="mx-2">
              <a className='text-primary' href="https://www.linkedin.com/in/diegoalmda/" target="__blank"><LinkedinLogo size={32} /></a>          
            </span>
          </p>
        </footer>
      </div>
    }
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllProducts() as Data; 
  
  const categoriesSet = new Set(data.map(product => product.sport));
  const categories: string[] = []
  categoriesSet.forEach(category => categories.push(category));

  return {
    props: {
      categories
    },
    // revalidate: 60 * 60 * 2, // revalida a cada 2 horas
  }
}
