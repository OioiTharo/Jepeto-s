"use client";

import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 85vh;
    font-family: 'Roboto', sans-serif;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`

const LeftSection = styled.section`
    background-color: #1E88E5;
    padding: 0rem 4rem;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;

    @media (max-width: 50%) {
        display: none;
    }
`
const Paragraph = styled.p`
    width: 100%;
    font-weight: 600;
    margin: 0px 15px;
    text-align: center;
`;

const Feature = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
`

const FeatureIcon = styled.div`
    width: 20%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 15px;
    img{
        max-width: 700%;
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

const LoginForm = styled.form`
    width: 100%;
    max-width: 400px;
`

const GoogleButton = styled.button`
    width: 100%;
    padding: 0.875rem;
    border: 1px solid #eaeaea;
    border-radius: 50px;
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
    border-radius: 50px;
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: black;
    }
`

const ForgotPassword = styled.div`
    text-align: right;
    margin-bottom: 1rem;
    display: flex; 
    justify-content: flex-start; 

    a {
        color: black;
        text-decoration: none;
        font-size: 0.875rem;

        &:hover {
            color: #1E88E5;
        }
    }
`

const SubmitButton = styled.button`
    width: 100%;
    padding: 0.875rem;
    background-color: #1E88E5;
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.9;
    }
`
const Decor = styled.div`
    vertical-align: top;
    text-align: center;
    margin-bottom: 10%;
`

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
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
              <img src="/image1login.png"/>
            </FeatureIcon>
            <Paragraph>Encontre um profissional online,com um simples toque</Paragraph>
          </Feature>

          <Feature>
            <Paragraph>Customize a sua experiência</Paragraph>
            <FeatureIcon>
              <img src="/image2login.png"/>
            </FeatureIcon>
          </Feature>

          <Feature>
            <FeatureIcon>
              <img src="/image3login.png" />
            </FeatureIcon>
            <Paragraph>Em qualquer lugar estando no conforto da sua casa</Paragraph>
          </Feature>
        </LeftSection>

        <RightSection>
            <Decor>
            <img src="/loginBolas.png" width="100%"/>
            <img src="/logo.png" height="100"/>
            </Decor>
            <LoginForm onSubmit={handleSubmit}>
            <GoogleButton type="button">
              <img src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png" alt="" width="20" height="20" />
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
                <Link href="/forgot-password">Esqueceu sua senha?</Link> 
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