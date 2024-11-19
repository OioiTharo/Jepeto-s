"use client";
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import ServiceProviderProfile from '../../components/perfil';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Roboto', sans-serif;
`;

const MainContent = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  flex: 2;
`;

const RightColumn = styled.div`
  flex: 1;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Banner = styled.div`
  height: 200px;
  background: #1E88E5;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ProfileName = styled.h1`
  font-size: 1.5rem;
  color: #1E88E5;
  margin-bottom: 10px;
`;

const LocationText = styled.p`
  font-size: 0.9rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;

  .material-icons {
    font-size: 16px;
    color: #1E88E5;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  color: #1E88E5;
  margin-bottom: 10px;
`;

const ProviderCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background: #f9f9f9;
  }
`;

const ProviderImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProviderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProviderName = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

const ProviderOccupation = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  color: #FFD700;
`;

const SeeMoreButton = styled.button`
  background: #1E88E5;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
`;

const Bazul = styled.a`
  background-color: #1E88E5;
  text-decoration: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    opacity: 0.8;
  }
`;

export default function ClientProfilePage() {
  const router = useRouter();
  const { authData } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [userData, setUserData] = useState({});
  const [providers, setProviders] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (!authData?.token || authData.userType !== 'cliente') {
      router.push('/login');
      return;
    }

    setUserData({
      nome: authData.userName || 'Usuário',
      localizacao: 'São Paulo, SP',
    });

    setProviders([
      {
        id: 1,
        name: "João Silva",
        occupation: "Eletricista",
        rating: 4.8,
        reviews: 156,
        image: "/placeholder.png",
        location: "São Paulo, SP",
        verified: true,
        services: ["Instalações Elétricas", "Manutenção Preventiva", "Projetos Elétricos"],
        about: "Profissional especializado em instalações elétricas residenciais e comerciais.",
        availability: "Segunda à Sexta, 8h às 18h",
        experience: "15 anos no mercado",
      },
    ]);

    setServices([
      {
        title: "Instalação Elétrica Residencial",
        description: "Preciso de um eletricista para instalação de tomadas e revisão geral da rede elétrica.",
        status: "Em andamento",
      },
    ]);
  }, [authData, router]);

  return (
    <Container>
      <MainContent>
        <LeftColumn>
          <Card>
            <Banner />
            <ProfileContent>
              <ProfileName>{userData.nome}</ProfileName>
              <LocationText>
                <span className="material-icons">place</span>
                {userData.localizacao}
              </LocationText>
              <Bazul href="/servicos">Solicitar novo serviço</Bazul>
            </ProfileContent>
          </Card>
        </LeftColumn>

        <RightColumn>
          <Card>
            <ProfileContent>
              <SectionTitle>Meus Serviços</SectionTitle>
              {services.map((service, index) => (
                <div key={index}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <p>Status: {service.status}</p>
                  <hr />
                </div>
              ))}
            </ProfileContent>
          </Card>
        </RightColumn>
      </MainContent>
    </Container>
  );
}
