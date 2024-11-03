"use client";

import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`

const LeftSection = styled.section`
    background-color: blue;
    padding: 3rem;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;

    @media (max-width: 768px) {
        display: none;
    }
`

const Feature = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 2rem;
    border-radius: 1rem;
`

const FeatureIcon = styled.div`
    width: 48px;
    height: 48px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const FeatureText = styled.div`
    h3 {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
    }

    p {
        opacity: 0.9;
        font-size: 0.875rem;
    }
`

const RightSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: white;
`

const Logo = styled.div`
    margin-bottom: 2rem;
    text-align: center;

    img {
        width: 120px;
        height: auto;
    }
`

const LoginForm = styled.form`
    width: 100%;
    max-width: 400px;
`

const GoogleButton = styled.button`
    width: 100%;
    padding: 0.875rem;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f5f5f5;
    }
`

const Divider = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    margin: 1.5rem 0;
    color: #666;

    &::before,
    &::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid #eaeaea;
    }

    span {
        padding: 0 10px;
    }
`

const FormGroup = styled.div`
    margin-bottom: 1rem;
`

const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-size: 0.875rem;
`

const Input = styled.input`
    width: 100%;
    padding: 0.875rem;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: black;
    }
`

const ForgotPassword = styled.div`
    text-align: right;
    margin-bottom: 1rem;

    a {
        color: black;
        text-decoration: none;
        font-size: 0.875rem;

        &:hover {
        text-decoration: underline;
        }
    }
`

const SubmitButton = styled.button`
    width: 100%;
    padding: 0.875rem;
    background-color: blue;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.9;
    }
`

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implementar lógica de login aqui
    console.log('Login attempt:', { email, password })
  }

  return (
    <>
      <Head>
        <title>Login - MeuServiço</title>
      </Head>

      <Container>
        <LeftSection>
          <Feature>
            <FeatureIcon>
              <img src="/icons/profile.svg" alt="" width="24" height="24" />
            </FeatureIcon>
            <FeatureText>
              <h3>Encontre um profissional online</h3>
              <p>Com um simples toque</p>
            </FeatureText>
          </Feature>

          <Feature>
            <FeatureIcon>
              <img src="/icons/customize.svg" alt="" width="24" height="24" />
            </FeatureIcon>
            <FeatureText>
              <h3>Customize a sua experiência</h3>
              <p>De acordo com suas necessidades</p>
            </FeatureText>
          </Feature>

          <Feature>
            <FeatureIcon>
              <img src="/icons/home.svg" alt="" width="24" height="24" />
            </FeatureIcon>
            <FeatureText>
              <h3>Em qualquer lugar</h3>
              <p>Estando no conforto da sua casa</p>
            </FeatureText>
          </Feature>
        </LeftSection>

        <RightSection>
          <Logo>
            <img src="/logo.svg" alt="MeuServiço" />
          </Logo>

          <LoginForm onSubmit={handleSubmit}>
            <GoogleButton type="button">
              <img src="/icons/google.svg" alt="" width="20" height="20" />
              Login com o Google
            </GoogleButton>

            <Divider>
              <span>or</span>
            </Divider>

            <FormGroup>
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Senha*</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>

            <ForgotPassword>
              <Link href="/forgot-password">
                <a>Esqueceu sua senha?</a>
              </Link>
            </ForgotPassword>

            <SubmitButton type="submit">
              Login
            </SubmitButton>
          </LoginForm>
        </RightSection>
      </Container>
    </>
  )
}