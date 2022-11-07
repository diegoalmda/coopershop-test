import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head'
import { getAllProducts, getFilteredProducts } from '../services/products';
import { GetStaticProps } from 'next';
import { Data } from '../types/DataType';
import { ProductCard } from '../components/ProductCard';
import { LinkedinLogo } from "phosphor-react";
import Form from 'react-bootstrap/Form';
import { HeaderComponent } from '../components/HeaderComponent';

interface HomeProps {
  categories: string[];
}

export default function Home({ categories }: HomeProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const[products, setProducts] = useState<Data>([] as Data);

  function handleSelectedCategory(category: string) {
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

      <HeaderComponent />
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
    revalidate: 60 * 60 * 24, // revalida a cada 24 horas
  }
}
