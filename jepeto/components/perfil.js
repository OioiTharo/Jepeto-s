"use client";
import styled from 'styled-components';
import React, { useState } from 'react';

const Container = styled.div`
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    min-height: 60vh;
`;

const ProfileCard = styled.div`
    background: white;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 1000px;
    width: 80%;
    margin: 1.5rem auto;
    overflow: hidden;
`;

const BannerSection = styled.div`
    position: relative;
    height: 200px;
    display: flex;
    align-items: center;
    background: #f0f0f0;
`;

const BannerImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
`;

const NavigationButton = styled.button`
    position: absolute;
    background: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 2;

    &:hover {
        background: #f5f5f5;
    }

    &.left {
        left: 20px;
    }

    &.right {
        right: 20px;
    }
`;

const ProfileInfoSection = styled.div`
    padding: 0 2rem 2rem;
    position: relative;
`;

const ProfileImageContainer = styled.div`
    position: relative;
    margin-top: -40px;
    margin-bottom: 1rem;
`;

const ProfileImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: white;
`;

const CameraButton = styled.button`
    position: absolute;
    bottom: 0;
    right: -10px;
    background: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .material-icons {
        font-size: 14px;
        color: #1E88E5;
    }
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
    color: #666;
    font-size: 1rem;
    margin-bottom: 1rem;
`;

const InfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: #666;

    .material-icons {
        font-size: 18px;
        color: #1E88E5;
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin: 1.5rem 0;
`;

const ActionButton = styled.button`
    padding: 0.6rem 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: ${props => props.primary ? '#1E88E5' : 'white'};
    color: ${props => props.primary ? 'white' : 'black'};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: ${props => props.primary ? '#1976D2' : '#f5f5f5'};
    }

    .material-icons {
        font-size: 16px;
    }
`;

const Section = styled.div`
    margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #333;
`;

const SectionContent = styled.p`
    color: #666;
    line-height: 1.5;
`;

const ServiceList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
`;

const ServiceTag = styled.span`
    background: #E3F2FD;
    color: #1E88E5;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
`;


const ServiceProviderProfile = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const workImages = [
        "/api/placeholder/1000/300",
        "/api/placeholder/1000/300",
        "/api/placeholder/1000/300"
    ];

    return (
        <Container>
            <ProfileCard>
                <BannerSection>
                    <BannerImage 
                        src={workImages[currentImageIndex]} 
                        alt="Trabalho realizado" 
                    />
                    <NavigationButton 
                        className="left"
                        onClick={() => setCurrentImageIndex(prev => 
                            prev === 0 ? workImages.length - 1 : prev - 1
                        )}
                    >
                        <span className="material-icons">chevron_left</span>
                    </NavigationButton>
                    <NavigationButton 
                        className="right"
                        onClick={() => setCurrentImageIndex(prev => 
                            prev === workImages.length - 1 ? 0 : prev + 1
                        )}
                    >
                        <span className="material-icons">chevron_right</span>
                    </NavigationButton>
                </BannerSection>

                <ProfileInfoSection>
                    <ProfileImageContainer>
                        <ProfileImage src="https://lh3.googleusercontent.com/proxy/W-l0a1Eh0AeUFjkEQsp2Yad9-RXY6SOvevtameg_-0bn2-bi3dgtW8eQ6TmC0zr_rkZCCWjB2i-hzpD05QWU46M6aMiTvYTJmdRRPZBe9pAG08Tq47bJ0sqrXlAfgwB81zEpxmrFAoDHGJaRD0Ny-Qv42lX76-4iS-QfpTm-QCak1RJI-FNftoABxGE" alt="João Silva" />
                        <CameraButton>
                            <span className="material-icons">photo_camera</span>
                        </CameraButton>
                    </ProfileImageContainer>

                    <Title>João Silva</Title>
                    <Subtitle>Eletricista Profissional</Subtitle>

                    <InfoItem>
                        <span className="material-icons">place</span>
                        <span>São Paulo, SP</span>
                    </InfoItem>

                    <InfoItem>
                        <span className="material-icons">star</span>
                        <span>4.8 (156 avaliações)</span>
                    </InfoItem>

                    <InfoItem>
                        <span className="material-icons">verified</span>
                        <span>Verificado</span>
                    </InfoItem>

                    <ButtonsContainer>
                        <ActionButton primary>
                            Solicitar Serviço
                        </ActionButton>
                        <ActionButton>
                            <span className="material-icons">edit</span>
                            Editar Perfil
                        </ActionButton>
                    </ButtonsContainer>

                    <Section>
                        <SectionTitle>Sobre</SectionTitle>
                        <SectionContent>
                            Profissional especializado em instalações elétricas residenciais e comerciais, 
                            com foco em qualidade e segurança.
                        </SectionContent>
                    </Section>

                    <Section>
                        <SectionTitle>Serviços Oferecidos</SectionTitle>
                        <ServiceList>
                            <ServiceTag>Instalações Elétricas</ServiceTag>
                            <ServiceTag>Manutenção Preventiva</ServiceTag>
                            <ServiceTag>Projetos Elétricos</ServiceTag>
                        </ServiceList>
                    </Section>

                    <Section>
                        <SectionTitle>Experiência</SectionTitle>
                        <SectionContent>15 anos no mercado</SectionContent>
                    </Section>

                    <Section>
                        <SectionTitle>Disponibilidade</SectionTitle>
                        <InfoItem>
                            <span className="material-icons">schedule</span>
                            <span>Segunda à Sexta, 8h às 18h</span>
                        </InfoItem>
                    </Section>
                </ProfileInfoSection>
            </ProfileCard>
        </Container>
    );
};

export default ServiceProviderProfile;