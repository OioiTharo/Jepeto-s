//jepeto\src\app\perfil\profissional\page.js
"use client";
import styled from 'styled-components';
import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import ServiceProviderProfile from '../../components/perfil';
import { useAuth } from '../../context/AuthContext';


const Container = styled.div`
    font-family: 'Roboto', sans-serif;
    display: flex;
    padding: 2rem;
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;

    @media (max-width: 1200px) {
        flex-direction: column;
    }
`;

const LeftColumn = styled.div`
    flex: 2;
`;

const RightColumn = styled.div`
    flex: 1;
`;

const FormCard = styled.div`
    background: white;
    border-radius: 20px;
    padding: 2.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ServiceListCard = styled.div`
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    height: fit-content;
    position: sticky;
    top: 2rem;
`;

const FormContainer = styled.form`
    flex: 1;
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
    margin-bottom: 0.8rem; 
`;

const Input = styled.input`
    width: 98%;
    padding: 0.6rem; 
    border: none;
    background-color: #f0f0f0;
    border-radius: 6px; 
    font-size: 0.85rem; 

    &:focus {
        outline: 2px solid #1E88E5;
        background-color: #fff;
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 0.6rem; 
    border: none;
    background-color: #f0f0f0;
    border-radius: 6px;
    font-size: 0.85rem; 
    appearance: none;

    &:focus {
        outline: 2px solid #1E88E5;
        background-color: #fff;
    }
`;

const TextArea = styled.textarea`
    width: 98%;
    padding: 0.6rem; 
    border: none;
    background-color: #f0f0f0;
    border-radius: 6px; 
    font-size: 0.85rem; 
    min-height: 80px; 
    resize: vertical;
    font-family: 'Roboto', sans-serif;

    &:focus {
        outline: 2px solid #1E88E5;
        background-color: #fff;
    }
`;

const MultiSelect = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const WeekDaySelect = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

const TimeContainer = styled.div`
    display: flex;
    gap: 0.5rem; 
    align-items: center;
    font-size: 0.85rem; 
`;

const Button = styled.button`
    background-color: #1E88E5;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.8rem 1.5rem; 
    font-size: 0.9rem; 
    cursor: pointer;
    width: 100%;
    margin-top: 1rem;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.9;
    }
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

const ErrorMessage = styled.span`
    color: #dc3545;
    font-size: 0.75rem; 
    margin-top: 0.2rem;
    display: block;
`;

const ServiceItem = styled.div`
    padding: 1rem;
    border-bottom: 1px solid #eee;
    cursor: pointer;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background: #f8f9fa;
    }
`;

const ServiceTitle = styled.h3`
    font-size: 1rem;
    color: #1E88E5;
    margin-bottom: 0.5rem;
`;

const ServiceDetails = styled.div`
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
`;

const TwoColumnLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.8rem;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const ModalContent = styled.div`
    background: white;
    border-radius: 10px;
    padding: 2rem;
    width: 95%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
`;

const ModalSection = styled.div`
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;

    &:last-child {
        border-bottom: none;
    }
`;

const ModalTitle = styled.h2`
    font-size: 1.5rem;
    color: #1E88E5;
    margin-bottom: 1.5rem;
`;

const Label = styled.div`
    font-weight: 500;
    margin-bottom: 0.5rem;
`;

const Value = styled.div`
    color: #666;
    margin-bottom: 1rem;
`;

const Bazul = styled.a`
    background-color: #1E88E5;
    text-decoration: none;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    white-space: nowrap;
    &:hover {
        opacity: 0.5;
    }
`

// Constants
const categorias = [
    'Eletricista',
    'Encanador',
    'Pintor',
    'Pedreiro',
    'Marceneiro',
    'Jardineiro',
    'Diarista',
    'Técnico de Informática',
    'Ar Condicionado',
    'Eletrodomésticos'
];

const formasPagamento = [
    'Cartão de Crédito',
    'Cartão de Débito',
    'PIX',
    'TED',
    'Dinheiro'
];

const diasSemana = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo'
];

const urgencias = [
    'Baixa - Pode ser feito nos próximos dias',
    'Média - Precisa ser feito esta semana',
    'Alta - Precisa ser feito em 24-48h',
    'Urgente - Precisa ser feito hoje'
];

export default function ProfessionalProfilePage() {
    const router = useRouter();
    const { authData } = useAuth();
    const [selectedService, setSelectedService] = useState(null);
  
    const [formData, setFormData] = useState({
      categoria: '',
      titulo: '',
      descricao: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      cidade: '',
      estado: '',
      bairro: '',
      urgencia: '',
      pagamentos: [],
      diasDisponiveis: [],
      horarioInicio: '08:00',
      horarioFim: '18:00',
      orcamentoMaximo: ''
    });
  
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [cepError, setCepError] = useState('');
  
    const mockSolicitedServices = [
      {
        id: 1,
        titulo: "Instalação Elétrica Residencial",
        categoria: "Eletricista",
        descricao: "Preciso de um eletricista para instalação de tomadas e revisão geral da rede elétrica.",
        urgencia: "Média - Precisa ser feito esta semana",
        status: "Em andamento",
        data: "2024-02-14",
        pagamentos: ["PIX", "Dinheiro"],
        diasDisponiveis: ["Segunda", "Terça", "Quarta"],
        horarioInicio: "08:00",
        horarioFim: "18:00",
        orcamentoMaximo: "500",
        endereco: {
          cep: "12345-678",
          logradouro: "Rua Exemplo",
          numero: "123",
          complemento: "Apto 45",
          cidade: "São Paulo",
          estado: "SP",
          bairro: "Centro"
        },
        solicitante: {
          nome: "Thais Rodrigues",
          telefone: "(11) 98765-4321",
          email: "thais@email.com"
        },
        prestadores: [
          { nome: "João Silva", avaliacao: 4.8 },
          { nome: "Maria Santos", avaliacao: 4.9 }
        ]
      }
    ];
  
    useEffect(() => {
      // Redirecionar se o usuário não for profissional
      if (!authData?.token || authData.userType !== 'profissional') {
        router.push('/login');
      }
    }, [authData, router]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      if (name === 'cep') {
        const formattedCEP = value.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
        setFormData(prev => ({
          ...prev,
          [name]: formattedCEP
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
  
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    };
  
    return (
      <Container>
        <LeftColumn>
          <ServiceProviderProfile />
        </LeftColumn>
  
        <RightColumn>
          <ServiceListCard>
            <h2 style={{ marginBottom: '1.5rem' }}>Serviços Solicitados</h2>
            {mockSolicitedServices.map((service) => (
              <ServiceItem 
                key={service.id}
                onClick={() => setSelectedService(service)}
              >
                <ServiceTitle>{service.titulo}</ServiceTitle>
                <ServiceDetails>
                  <div>Categoria: {service.categoria}</div>
                  <div>Urgência: {service.urgencia}</div>
                  <div>Status: {service.status}</div>
                  <div>Data: {new Date(service.data).toLocaleDateString()}</div>
                </ServiceDetails>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#666',
                  fontSize: '0.8rem'
                }}>
                  <span>{service.prestadores.length} prestadores interessados</span>
                  <span className="material-icons" style={{ fontSize: '1.2rem' }}>
                    arrow_forward
                  </span>
                </div>
              </ServiceItem>
            ))}
          </ServiceListCard>
        </RightColumn>
  
        {selectedService && (
          <Modal onClick={() => setSelectedService(null)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={() => setSelectedService(null)}>
                <span className="material-icons">close</span>
              </CloseButton>
  
              <ModalTitle>{selectedService.titulo}</ModalTitle>
  
              <ModalSection>
                <Label>Solicitante</Label>
                <Value>Nome: {selectedService.solicitante.nome}</Value>
                <Value>Telefone: {selectedService.solicitante.telefone}</Value>
                <Value>Email: {selectedService.solicitante.email}</Value>
              </ModalSection>
  
              <ModalSection>
                <Label>Informações do Serviço</Label>
                <Value>Categoria: {selectedService.categoria}</Value>
                <Value>Descrição: {selectedService.descricao}</Value>
                <Value>Urgência: {selectedService.urgencia}</Value>
                <Value>Status: {selectedService.status}</Value>
                <Value>Data: {new Date(selectedService.data).toLocaleDateString()}</Value>
              </ModalSection>
  
              <Bazul href="/">Aceitar serviço</Bazul>
            </ModalContent>
          </Modal>
        )}
      </Container>
    );
  }