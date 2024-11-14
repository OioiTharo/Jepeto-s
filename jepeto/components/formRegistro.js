"use client";
import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  width: 85%;
  padding: 0.8rem;
  border: none;
  background-color: #f0f0f0;
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
  width: 97%;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.5;
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
    estado: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    confirmEmail: '',
    senha: '',
    confirmaSenha: ''
  });

  const [loading, setLoading] = useState(false);
  const [cepError, setCepError] = useState('');

  const formatCEP = (value) => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const formatCPF = (value) => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (value) => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const validateFields = (name, value) => {
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors(prev => ({
          ...prev,
          email: 'Email inválido'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          email: ''
        }));
      }

      if (formData.confirmEmail && value !== formData.confirmEmail) {
        setErrors(prev => ({
          ...prev,
          confirmEmail: 'Os emails não coincidem'
        }));
      } else if (formData.confirmEmail) {
        setErrors(prev => ({
          ...prev,
          confirmEmail: ''
        }));
      }
    }

    if (name === 'confirmEmail') {
      if (value !== formData.email) {
        setErrors(prev => ({
          ...prev,
          confirmEmail: 'Os emails não coincidem'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          confirmEmail: ''
        }));
      }
    }

    if (name === 'senha') {
      if (value.length < 8) {
        setErrors(prev => ({
          ...prev,
          senha: 'A senha deve ter no mínimo 8 caracteres'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          senha: ''
        }));
      }

      if (formData.confirmaSenha && value !== formData.confirmaSenha) {
        setErrors(prev => ({
          ...prev,
          confirmaSenha: 'As senhas não coincidem'
        }));
      } else if (formData.confirmaSenha) {
        setErrors(prev => ({
          ...prev,
          confirmaSenha: ''
        }));
      }
    }

    if (name === 'confirmaSenha') {
      if (value !== formData.senha) {
        setErrors(prev => ({
          ...prev,
          confirmaSenha: 'As senhas não coincidem'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          confirmaSenha: ''
        }));
      }
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

      setFormData(prev => ({
        ...prev,
        logradouro: data.logradouro || '',
        cidade: data.localidade || '',
        estado: data.uf || '',
        bairro: data.bairro || ''
      }));
    } catch (error) {
      setCepError('Erro ao buscar CEP');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cep') {
      const formattedCEP = formatCEP(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedCEP
      }));

      if (value.replace(/\D/g, '').length === 8) {
        fetchAddressByCEP(value);
      }
    } else if (name === 'cpf') {
      const formattedCPF = formatCPF(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedCPF
      }));
    } else if (name === 'telefone') {
      const formattedPhone = formatPhone(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      if (['email', 'confirmEmail', 'senha', 'confirmaSenha'].includes(name)) {
        validateFields(name, value);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).some(error => error !== '')) {
      return;
    }
    console.log(formData);
  };

  const getTitleText = () => {
    if (userType === 'cliente') {
      return {
        title: 'Cadastro de Cliente',
        subtitle: 'Encontre os melhores profissionais para seus serviços'
      };
    }
    return {
      title: 'Cadastro de Profissional',
      subtitle: 'Comece a oferecer seus serviços hoje mesmo'
    };
  };

  return (
    <Container>
      <FormCard>
        <FormContainer onSubmit={handleSubmit}>
          <Title>{getTitleText().title}</Title>
          <SubTitle>{getTitleText().subtitle}</SubTitle>
          
          
          <FormGrid>
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
                placeholder="(11) 95242-0782"
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
                placeholder="Email@MeuServico.com.br"
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
              <Label>Confirme a senha</Label>
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
              {cepError && <span style={{ color: 'red', fontSize: '0.8rem' }}>{cepError}</span>}
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

          <Button 
            type="submit"
            disabled={Object.values(errors).some(error => error !== '')}
          >
            Comece a jornada
          </Button>
        </FormContainer>

        <ImageContainer>
          <img src="/image3cadastro.png" alt="Ilustração de registro" />
        </ImageContainer>
      </FormCard>
    </Container>
  );
}