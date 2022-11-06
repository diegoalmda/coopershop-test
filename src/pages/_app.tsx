import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css';
import { GlobalCartContextProvider } from '../contexts/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalCartContextProvider>
      <Component {...pageProps} />
      <ToastContainer theme="light" />
    </GlobalCartContextProvider>
  )
}
