
import '../styles/globals.css';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import AOSInitializer from '../components/AOSInitializer';
import { CartProvider } from './context/CartContext';



export default function RootLayout({ children }) {

    return (
        <html lang="en" data-theme="lofi" >
            <head>
                <title>Impulso Ventas</title>
                <link rel="icon" href="/images/logo-dba.ico" sizes="any" />
            </head>
            <body className="antialiased bg-[#0B0B5C]">
                <AOSInitializer />
                <Header />
                <CartProvider>
                {children}
                </CartProvider>
                <Footer />
            </body>
        </html>
    );
}
