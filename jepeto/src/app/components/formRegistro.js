"use client";
import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext'; // Ajustado o caminho para usar o alias "@/context/AuthContext"

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 60vh;
  background-color: #f5f5f5;
`;

const FormCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem 3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 4rem;
  max-width: 1200px;
  width: 90%;
  margin: 2rem auto;
  flex-wrap: wrap;
`;

const FormContainer = styled.form`
  flex: 1;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 70%;
    height: auto;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;

  &:focus {
    outline: 2px solid #0066FF;
    background-color: #fff;
  }
`;

const Button = styled.button`
  background-color: #1E88E5;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  display: block;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1E88E5;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
`;

const SubTitle = styled.p`
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
`;

export default function Form({ userType }) {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    confirmEmail: '',
    telefone: '',
    senha: '',
    confirmaSenha: '',
    cep: '',
    cpf: '',
    logradouro: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: '',
    tipoUsuario: userType,
  });

  const [errors, setErrors] = useState({});
  const [cepError, setCepError] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));

    if (name === 'cep') {
      fetchAddressByCEP(value);
    }
  };

  const fetchAddressByCEP = async (cep) => {
    const cleanCEP = cep.replace(/\D/g, '');

    if (cleanCEP.length !== 8) {
      setCepError('CEP deve ter 8 dígitos');
      return;
    }

    setLoading(true);
    setCepError('');

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
      const data = await response.json();

      if (data.erro) {
        setCepError('CEP não encontrado');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        logradouro: data.logradouro || '',
        cidade: data.localidade || '',
        estado: data.uf || '',
      }));
    } catch (error) {
      setCepError('Erro ao buscar CEP');
    } finally {
      setLoading(false);
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Os emails não coincidem';
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (formData.senha !== formData.confirmaSenha) {
      newErrors.confirmaSenha = 'As senhas não coincidem';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const { user } = await register(formData);
      router.push(user.tipoUsuario === 'cliente' ? '/perfil/cliente' : '/perfil/profissional');
    } catch (error) {
      setApiError(error.message || 'Erro ao registrar. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <FormCard>
        <FormContainer onSubmit={handleSubmit}>
          <Title>{userType === 'cliente' ? 'Cadastro de Cliente' : 'Cadastro de Profissional'}</Title>
          <SubTitle>
            {userType === 'cliente'
              ? 'Encontre os melhores profissionais para seus serviços'
              : 'Comece a oferecer seus serviços hoje mesmo'}
          </SubTitle>

          {apiError && <ErrorMessage>{apiError}</ErrorMessage>}

          <FormGrid>
            {/* ... (todos os FormGroup com inputs) */}
            {/* Vou incluir todos os campos abaixo */}

            <FormGroup>
              <Label>Nome</Label>
              <Input
                type="text"
                name="nome"
                placeholder="Digite o seu nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Sobrenome</Label>
              <Input
                type="text"
                name="sobrenome"
                placeholder="Digite o seu sobrenome"
                value={formData.sobrenome}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>CPF</Label>
              <Input
                type="text"
                name="cpf"
                placeholder="123.456.789-10"
                value={formData.cpf}
                onChange={handleChange}
                maxLength="14"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Telefone</Label>
              <Input
                type="tel"
                name="telefone"
                placeholder="(11) 99999-9999"
                value={formData.telefone}
                onChange={handleChange}
                maxLength="15"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="email@meuservico.com.br"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Confirme seu Email</Label>
              <Input
                type="email"
                name="confirmEmail"
                placeholder="Digite seu email novamente"
                value={formData.confirmEmail}
                onChange={handleChange}
                required
              />
              {errors.confirmEmail && <ErrorMessage>{errors.confirmEmail}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Senha</Label>
              <Input
                type="password"
                name="senha"
                placeholder="********"
                value={formData.senha}
                onChange={handleChange}
                required
              />
              {errors.senha && <ErrorMessage>{errors.senha}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Confirme a Senha</Label>
              <Input
                type="password"
                name="confirmaSenha"
                placeholder="********"
                value={formData.confirmaSenha}
                onChange={handleChange}
                required
              />
              {errors.confirmaSenha && <ErrorMessage>{errors.confirmaSenha}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>CEP</Label>
              <Input
                type="text"
                name="cep"
                placeholder="00000-000"
                value={formData.cep}
                onChange={handleChange}
                maxLength="9"
                required
              />
              {loading && <span style={{ color: '#666', fontSize: '0.8rem' }}>Buscando CEP...</span>}
              {cepError && <ErrorMessage>{cepError}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Logradouro</Label>
              <Input
                type="text"
                name="logradouro"
                placeholder="Rua, Avenida, etc"
                value={formData.logradouro}
                onChange={handleChange}
                readOnly={loading}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Número</Label>
              <Input
                type="text"
                name="numero"
                placeholder="Número"
                value={formData.numero}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Complemento</Label>
              <Input
                type="text"
                name="complemento"
                placeholder="Apartamento, sala, etc"
                value={formData.complemento}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Cidade</Label>
              <Input
                type="text"
                name="cidade"
                placeholder="Cidade"
                value={formData.cidade}
                onChange={handleChange}
                readOnly={loading}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Estado</Label>
              <Input
                type="text"
                name="estado"
                placeholder="Estado"
                value={formData.estado}
                onChange={handleChange}
                readOnly={loading}
                required
              />
            </FormGroup>
          </FormGrid>

          <Button type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Cadastrar'}
          </Button>
        </FormContainer>

        <ImageContainer>
          <img src="/image3cadastro.png" alt="Ilustração de registro" />
        </ImageContainer>
      </FormCard>
    </Container>
  );
}
