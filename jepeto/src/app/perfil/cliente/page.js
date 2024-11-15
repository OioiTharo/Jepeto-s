"use client";
import styled from 'styled-components';
import React, { useState } from 'react';
import ServiceProviderProfile from '../../../../components/perfil';

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
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    margin-bottom: 20px;
    overflow: hidden;
`;

const Banner = styled.div`
    background: #1E88E5;
    height: 150px;
`;

const ProfileContent = styled.div`
    padding: 20px;
`;

const ProfileName = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;
`;

const LocationText = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    color: #666;
    margin-bottom: 15px;
`;

const RequestButton = styled.button`
    background: #1E88E5;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background: #1976D2;
    }
`;

const ProfileHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const SectionTitle = styled.h2`
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: 500;
`;

const ServiceCard = styled.div`
    padding: 15px;
    border-bottom: 1px solid #eee;
    cursor: pointer;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background: #f9f9f9;
    }
`;

const ServiceTitle = styled.h3`
    color: #1E88E5;
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: 500;
`;

const ServiceDescription = styled.p`
    color: #666;
    font-size: 14px;
    margin-bottom: 10px;
`;

const ServiceStatus = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666;
    font-size: 14px;
`;

const ProviderCard = styled.div`
    display: flex;
    gap: 10px;
    padding: 15px;
    border-bottom: 1px solid #eee;
    cursor: pointer;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background: #f9f9f9;
    }
`;

const ProviderImage = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
`;

const ProviderInfo = styled.div`
    flex: 1;
`;

const ProviderName = styled.div`
    font-weight: 500;
    margin-bottom: 2px;
`;

const ProviderOccupation = styled.div`
    color: #666;
    font-size: 14px;
    margin-bottom: 2px;
`;

const Rating = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    color: #666;
    font-size: 14px;
`;

const SeeMoreButton = styled.button`
    width: 100%;
    padding: 10px;
    color: #1E88E5;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background: #f5f5f5;
    }
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

const ModalContent = styled.div`
    background: white;
    border-radius: 10px;
    width: 95%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 1;

    &:hover {
        background: #f5f5f5;
    }
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

export default function ClientProfilePage() {
    const [selectedProvider, setSelectedProvider] = useState(null);

    const providers = [
        {
            id: 1,
            name: "João Silva",
            occupation: "Eletricista",
            rating: 4.8,
            reviews: 156,
            image: "/api/placeholder/48/48",
            location: "São Paulo, SP",
            verified: true,
            services: ["Instalações Elétricas", "Manutenção Preventiva", "Projetos Elétricos"],
            about: "Profissional especializado em instalações elétricas residenciais e comerciais.",
            availability: "Segunda à Sexta, 8h às 18h",
            experience: "15 anos no mercado"
        },
        {
            id: 2,
            name: "Maria Santos",
            occupation: "Pintora",
            rating: 4.9,
            reviews: 203,
            image: "/api/placeholder/48/48",
            location: "São Paulo, SP",
            verified: true,
            services: ["Pintura", "Textura", "Papel de Parede"],
            about: "Especialista em pintura residencial e comercial.",
            availability: "Segunda à Sábado, 7h às 17h",
            experience: "10 anos no mercado"
        },
        {
            id: 3,
            name: "Carlos Oliveira",
            occupation: "Encanador",
            rating: 4.7,
            reviews: 128,
            image: "/api/placeholder/48/48",
            location: "São Paulo, SP",
            verified: true,
            services: ["Reparos", "Instalações", "Manutenção"],
            about: "Especialista em reparos e instalações hidráulicas.",
            availability: "Segunda à Sexta, 8h às 18h",
            experience: "12 anos no mercado"
        }
    ];

    const services = [
        {
            title: "Instalação Elétrica Residencial",
            description: "Preciso de um eletricista para instalação de tomadas e revisão geral da rede elétrica.",
            status: "Em andamento"
        },
        {
            title: "Pintura de Apartamento",
            description: "Pintura completa de apartamento de 70m², incluindo paredes e teto.",
            status: "Concluído"
        }
    ];

    return (
        <Container>
            <MainContent>
                <LeftColumn>
                    <Card>
                        <Banner />
                        <ProfileContent>
                            <ProfileHeader>
                                <ProfileInfo>
                                    <ProfileName>Thais Rodrigues</ProfileName>
                                    <LocationText>
                                        <span className="material-icons">place</span>
                                        São Paulo, SP
                                    </LocationText>
                                </ProfileInfo>
                                <Bazul href="/servicos" passHref>Solicitar novo serviço</Bazul>

                            </ProfileHeader>
                        </ProfileContent>
                    </Card>

                    <Card>
                        <ProfileContent>
                            <SectionTitle>Prestadores Recomendados</SectionTitle>
                            {providers.map(provider => (
                                <ProviderCard
                                    key={provider.id}
                                    onClick={() => setSelectedProvider(provider)}
                                >
                                    <ProviderImage src={provider.image} alt={provider.name} />
                                    <ProviderInfo>
                                        <ProviderName>{provider.name}</ProviderName>
                                        <ProviderOccupation>{provider.occupation}</ProviderOccupation>
                                        <Rating>
                                            <span className="material-icons" style={{ color: '#FFD700', fontSize: '16px' }}>
                                                star
                                            </span>
                                            {provider.rating} ({provider.reviews} avaliações)
                                        </Rating>
                                    </ProviderInfo>
                                </ProviderCard>
                            ))}
                            <SeeMoreButton>Ver mais prestadores</SeeMoreButton>
                        </ProfileContent>
                    </Card>
                </LeftColumn>

                <RightColumn>
                    <Card>
                        <ProfileContent>
                            <SectionTitle>Meus Serviços</SectionTitle>
                            {services.map((service, index) => (
                                <ServiceCard key={index}>
                                    <ServiceTitle>{service.title}</ServiceTitle>
                                    <ServiceDescription>{service.description}</ServiceDescription>
                                    <ServiceStatus>
                                        <span>Status: {service.status}</span>
                                        <span className="material-icons">arrow_forward</span>
                                    </ServiceStatus>
                                </ServiceCard>
                            ))}
                        </ProfileContent>
                    </Card>

                    <Card>
                        <ProfileContent>
                            <SectionTitle>Histórico de Serviços</SectionTitle>
                            <div style={{ color: '#666', fontSize: '14px' }}>
                                <div style={{ marginBottom: '5px' }}>Total de serviços: 5</div>
                                <div style={{ marginBottom: '5px' }}>Em andamento: 1</div>
                                <div>Concluídos: 4</div>
                            </div>
                        </ProfileContent>
                    </Card>
                </RightColumn>
            </MainContent>

            {selectedProvider && (
                <Modal onClick={() => setSelectedProvider(null)}>
                    <ModalContent onClick={e => e.stopPropagation()}>
                        <CloseButton onClick={() => setSelectedProvider(null)}>
                            <span className="material-icons">close</span>
                        </CloseButton>
                        <ServiceProviderProfile provider={selectedProvider} />
                    </ModalContent>
                </Modal>
            )}
        </Container>
    );
}