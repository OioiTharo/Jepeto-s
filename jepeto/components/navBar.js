import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useNavbar } from "../src/app/context/NavbarContext.js";
import Button from './button.js';

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
    display: ${props => props.visible ? 'block' : 'none'};
    position: absolute;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    margin-top: 20rem;
    padding: 1rem;
    z-index: 1000;
    right: 0; 
`;

const DropdownLink = styled(NavLink)`
    display: block; 
    padding: 0.5rem 0;
`;

const NavBarComponent = () => {
    const { activeMenu, updateActiveMenu } = useNavbar(); 
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    return (
        <Header>
            <img src="/logo.png" alt="MeuServiço" height="80" />
            <Nav>
                <Link href="/" passHref>
                    <NavLink>Pagina Inicial</NavLink>
                </Link>
                <Link href="/prestador" passHref>
                    <NavLink>Seja um prestador</NavLink>
                </Link>
                <Link href="/empresas" passHref>
                    <NavLink>Para Empresas</NavLink>
                </Link>
                <Link href="/login" passHref>
                    <NavLink>Login</NavLink>
                </Link>
                <Link href="/cadastro" passHref>
                    <NavLink>Registrar-se</NavLink>
                </Link>
                <Link href="/servicos" passHref>
                    <Button>Encontrar um serviço</Button>
                </Link>
            </Nav>

            <DropdownButton onClick={toggleDropdown}>
                <span class="material-icons">menu</span>
            </DropdownButton>

            <DropdownMenu visible={isDropdownVisible}>
                <Link href="/" passHref>
                    <DropdownLink>Pagina Inicial</DropdownLink>
                </Link>
                <Link href="/prestador" passHref>
                    <DropdownLink>Seja um prestador</DropdownLink>
                </Link>
                <Link href="/empresas" passHref>
                    <DropdownLink>Para Empresas</DropdownLink>
                </Link>
                <Link href="/login" passHref>
                    <DropdownLink>Login</DropdownLink>
                </Link>
                <Link href="/cadastro" passHref>
                    <DropdownLink>Registrar-se</DropdownLink>
                </Link>
                <Link href="/servicos" passHref>
                    <DropdownLink>
                        <Button>Encontrar um serviço</Button>
                    </DropdownLink>
                </Link>
            </DropdownMenu>
        </Header>
    );
};

export default NavBarComponent;
