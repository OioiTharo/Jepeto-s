"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Button from './button.js';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext.js';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  position: relative; 
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 600px) {
    display: none; 
  }
`;

const NavLink = styled.a`
  font-family: 'Roboto', sans-serif;
  text-decoration: none;
  color: black;
  font-size: 1rem;
  white-space: nowrap;
  font-weight: 600;

  &:hover {
    color: #1E88E5;
  }
`;

const DropdownButton = styled.button`
  display: none; 
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;

  @media (max-width: 600px) {
    display: block; 
  }
`;

const DropdownMenu = styled.div`
  display: ${(props) => (props.$visible ? 'block' : 'none')};
  position: absolute;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  margin-top: 2rem;
  padding: 1rem;
  z-index: 1000;
  right: 0; 
`;

const DropdownLink = styled(NavLink)`
  display: block; 
  padding: 0.5rem 0;
`;

const UserName = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: #1E88E5;
  font-weight: 600;
`;

const NavBarComponent = () => {
  const router = useRouter();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { authData, logout } = useAuth();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <Header>
      <Link href="/" passHref>
        <img src="/logo.png" alt="MeuServiço" height="80" style={{ cursor: 'pointer' }} />
      </Link>
      <Nav>
        <Link href="/" passHref>
          <NavLink>Página Inicial</NavLink>
        </Link>
        {authData && authData.token ? (
          <>
            <UserName>Olá, {authData.userName || "Usuário"}</UserName>
            {authData.userType === 'cliente' && (
              <>
                <Link href="/perfil/cliente" passHref>
                  <NavLink>Área do Cliente</NavLink>
                </Link>
                {/* Botão para clientes */}
                <Link href="/servicos" passHref>
                  <Button>Solicitar Serviço</Button>
                </Link>
              </>
            )}
            {authData.userType === 'profissional' && (
              <>
                <Link href="/perfil/profissional" passHref>
                  <NavLink>Área do Profissional</NavLink>
                </Link>
                {/* Botão para profissionais */}
                <Link href="/servicos-solicitados" passHref>
                  <Button>Serviços Solicitados</Button>
                </Link>
              </>
            )}
            <NavLink onClick={handleLogout} style={{ cursor: 'pointer' }}>Sair</NavLink>
          </>
        ) : (
          <>
            <Link href="/login" passHref>
              <NavLink>Login</NavLink>
            </Link>
            <Link href="/cadastro" passHref>
              <NavLink>Registrar-se</NavLink>
            </Link>
            {/* Botão para usuários não autenticados */}
            <Link href="/servicos" passHref>
              <Button>Encontrar um serviço</Button>
            </Link>
          </>
        )}
      </Nav>

      <DropdownButton onClick={toggleDropdown}>
        <span className="material-icons">menu</span>
      </DropdownButton>

      <DropdownMenu $visible={isDropdownVisible}>
        <Link href="/" passHref>
          <DropdownLink>Página Inicial</DropdownLink>
        </Link>
        {authData && authData.token ? (
          <>
            <UserName>Olá, {authData.userName || "Usuário"}</UserName>
            {authData.userType === 'cliente' && (
              <>
                <Link href="/perfil/cliente" passHref>
                  <DropdownLink>Área do Cliente</DropdownLink>
                </Link>
                {/* Botão para clientes */}
                <Link href="/servicos" passHref>
                  <DropdownLink>
                    <Button>Solicitar Serviço</Button>
                  </DropdownLink>
                </Link>
              </>
            )}
            {authData.userType === 'profissional' && (
              <>
                <Link href="/perfil/profissional" passHref>
                  <DropdownLink>Área do Profissional</DropdownLink>
                </Link>
                {/* Botão para profissionais */}
                <Link href="/servicos-solicitados" passHref>
                  <DropdownLink>
                    <Button>Serviços Solicitados</Button>
                  </DropdownLink>
                </Link>
              </>
            )}
            <DropdownLink onClick={handleLogout}>Sair</DropdownLink>
          </>
        ) : (
          <>
            <Link href="/login" passHref>
              <DropdownLink>Login</DropdownLink>
            </Link>
            <Link href="/cadastro" passHref>
              <DropdownLink>Registrar-se</DropdownLink>
            </Link>
            {/* Botão para usuários não autenticados */}
            <Link href="/servicos" passHref>
              <DropdownLink>
                <Button>Encontrar um serviço</Button>
              </DropdownLink>
            </Link>
          </>
        )}
      </DropdownMenu>
    </Header>
  );
};

export default NavBarComponent;