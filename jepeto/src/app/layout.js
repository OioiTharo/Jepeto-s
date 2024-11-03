"use client";

import NavBarComponent from '../../components/navBar';
import { NavbarProvider } from './context/NavbarContext'; 
import Footer from '../../components/footer';


export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
      <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>      </head>
      <body>
        <NavbarProvider> 
          <NavBarComponent />
          <main>{children}</main>
          <Footer/>
        </NavbarProvider>
      </body>
    </html>
  );
}
