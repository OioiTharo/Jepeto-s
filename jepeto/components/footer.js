// components/Footer/index.js
import styled from 'styled-components'
import Link from 'next/link'

const FooterContainer = styled.footer`
    font-family: 'Roboto', sans-serif;
    background-color: #F8F9FA;
    padding: 2rem 0;
    width: 100%;
`

const FooterContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 2rem;
        text-align: center;
    }
`

const Navigation = styled.nav`
    display: flex;
    gap: 2rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1rem;
    }
`

const NavLink = styled.a`
    color: #333;
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.2s;
    
    &:hover {
        opacity: 0.5;
    }
`

const SocialLinks = styled.div`
    display: flex;
    gap: 1.5rem;
    align-items: center;
`

const SocialLink = styled.a`
    color: #333;
    transition: color 0.2s;
    
    &:hover {
        opacity: 0.5;
    }
`

const Copyright = styled.div`
    text-align: center;
    color: #666;
    font-size: 0.875rem;
    padding-top: 2rem;
    border-top: 1px solid #eaeaea;
    margin-top: 2rem;
`

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Navigation>
          <Link href="/" passHref>
            <NavLink>Página Inicial</NavLink>
          </Link>
          <Link href="/seja-prestador" passHref>
            <NavLink>Seja um prestador</NavLink>
          </Link>
          <Link href="/para-empresas" passHref>
            <NavLink>Para Empresas</NavLink>
          </Link>
          <Link href="/contato" passHref>
            <NavLink>Contato</NavLink>
          </Link>
        </Navigation>

        <SocialLinks>
          <SocialLink 
            href="https://facebook.com/meuservico" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </SocialLink>
          
          <SocialLink 
            href="https://twitter.com/meuservico" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </SocialLink>
          
          <SocialLink 
            href="https://instagram.com/meuservico" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </SocialLink>
          
          <SocialLink 
            href="https://linkedin.com/company/meuservico" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </SocialLink>
        </SocialLinks>
      </FooterContent>

      <Copyright>
        Copyright © {new Date().getFullYear()} MeuServiço | Todos os direitos reservados
      </Copyright>
    </FooterContainer>
  )
}

export default Footer