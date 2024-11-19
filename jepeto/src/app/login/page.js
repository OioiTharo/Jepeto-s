"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Container = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  background-color: #f5f5f5;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  display: flex;
  gap: 0;
  max-width: 1200px;
  width: 90%;
  margin: 2rem auto;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormContainer = styled.div`
  flex: 1;
  padding: 2rem 3rem;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1e88e5;

  img {
    width: 80%;
    object-fit: contain;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const LoginForm = styled.form`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const Logo = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  img {
    height: 80px;
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;
  color: #666;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ddd;
  }

  span {
    padding: 0 10px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #1e88e5;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #1e88e5;
  }
`;

const ForgotPassword = styled.div`
  text-align: right;
  margin-top: -0.5rem;
  margin-bottom: 1rem;

  a {
    color: #1e88e5;
    font-size: 0.8rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 25px;
  background-color: #1e88e5;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 1rem;

  a {
    color: #1e88e5;
    margin-left: 0.5rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  display: block;
`;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "",senha: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    if (!formData.email || !formData.senha) {
      setError("Preencha todos os campos.");
      setLoading(false);
      return;
    }
  
    try {
      console.log('Enviando dados:', { ...formData, senha: '*****' }); // Debug
      const { user } = await login(formData);
      console.log('Login bem-sucedido:', user); // Debug
      console.log('Redirecionando para:', user.tipoUsuario === 'cliente' ? '/perfil/cliente' : '/perfil/profissional');
      router.replace(user.tipoUsuario === 'cliente' ? '/perfil/cliente' : '/perfil/profissional');

      
    } catch (err) {
      console.error('Erro completo:', err); // Debug
      setError(err.message || "Credenciais inválidas. Verifique seu email e senha.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login não implementado.");
  };

  return (
    <Container>
      <LoginCard>
        <FormContainer>
          <LoginForm onSubmit={handleSubmit}>
            <Logo>
              <img src="/logo.png" alt="MeuServiço" />
            </Logo>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <GoogleButton onClick={handleGoogleLogin} type="button">
              <img src="/googleicon.png" alt="Google" style={{ width: "20px" }} />
              Login com o Google
            </GoogleButton>

            <Divider>
              <span>ou</span>
            </Divider>

            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Digite seu email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Senha</Label>
              <Input
                type="password"
                name="senha"
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <ForgotPassword>
              <Link href="/recuperar-senha">Esqueceu sua senha?</Link>
            </ForgotPassword>

            <LoginButton type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Login"}
            </LoginButton>

            <RegisterLink>
              Não tem uma conta? <Link href="/cadastro">Registre-se</Link>
            </RegisterLink>
          </LoginForm>
        </FormContainer>
        <ImageContainer>
          <img src="/imagelogin.png" alt="Ilustração" style={{ objectPosition: "center" }} />
        </ImageContainer>
      </LoginCard>
    </Container>
  );
}
