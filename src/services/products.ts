import { Data } from "../types/DataType";
import axios from 'axios';

const BASE_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});  

export async function getAllProducts(): Promise<Data> {
  const response = await api.get('products');

  if(response) {
    return response.data;
  }
  
  return [] as Data;
}

export async function getFilteredProducts(filter: string): Promise<Data> {
  const { data } = await api.get<Data>('products');

  if(data.length > 0 && filter === '') {
    return data;
  } else if(data.length > 0 && filter !== '') {
    const filteredProducts = data.filter(product => product.sport.toLowerCase() === filter.toLowerCase());
    return filteredProducts;
  }
  
  return [] as Data;
}