"use client";
import styled from 'styled-components'
import Head from 'next/head'
import Button from '../../components/button';

const HeroSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 4rem;
  background-color: white;
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: black;
  max-width: 800px;
  font-family: 'Roboto', sans-serif;
`

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #212121;
  margin-bottom: 2rem;
  max-width: 600px;
  font-family: 'Roboto', sans-serif;
`

const ImageContainer = styled.div`
  img {
    max-width: 100%; 
    width: 600px; 
    height: auto;
    border-radius: 8px;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  max-width: 50%; 
`

const FeatureSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 3rem 4rem;
  background-color: #BBDEFB;
`

const FeatureImage = styled.div`
  margin-right: 4rem;
  img {
    max-width: 100%; 
    width: 600px; 
    height: auto;
    border-radius: 8px;
  }
`

const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  color: black;
  font-family: 'Roboto', sans-serif;
`

const FeatureDescription = styled.p`
  color: #212121;
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center; 
`


const VisibititySection  = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 4rem;
  background-color: #1E88E5;
  border-radius: 15px;
  margin: 50px;
`

const VisibitityTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: white;
  max-width: 800px;
  font-family: 'Roboto', sans-serif;
`
const VisibitityImage = styled.div`
  img {
    max-width: 100%; 
    width: 600px; 
    height: auto;
    border-radius: 8px;
  }
`

const StepsSection = styled.section`
  padding: 4rem 2rem;
`
const TitleSteps = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-size: 1.8rem;
  text-align: center;
`

const TitleCard = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  text-align: center;
  font-weight: 600;
`;


const TextoSteps = styled.p`
  font-family: 'Roboto', sans-serif;
  text-align: center;
  font-size: 0.8rem;
`

const StepsList = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Roboto', sans-serif;
  flex-wrap: wrap;
`

const StepCard = styled.div`
  margin-top: 10px;
  background-color: white;
  padding: 10px;
  border: 1px solid #5D5A88;
  border-radius: 10px;
  text-align: center;
  flex: 1;
  width: 30%;
  font-family: 'Roboto', sans-serif;
`

const StepNumber = styled.p`
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 2rem;
  font-family: 'Roboto', sans-serif;
`
const Consultor = styled.a`
  font-family: 'Roboto', sans-serif;
  border: 2px solid #212121;
  color: #212121;
  background-color: transparent;
  border-radius: 50px;
  padding: 0.65rem 1.3rem;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease, color 0.3s ease;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: none;
  margin-left: 10px; 
  
  &:hover {
    background-color: #212121;
    color: white;
  }
`

const VisibitityA = styled.a`
  font-family: 'Roboto', sans-serif;
  color: #1E88E5;
  background-color: white;
  border-radius: 50px;
  padding: 0.65rem 1.3rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  margin-left: 10px; 
  &:hover {
    opacity: 0.8; 
  }
`

const VisibitityDuv = styled.a`
  font-family: 'Roboto', sans-serif;
  border: 2px solid white;
  color: white;
  background-color: transparent;
  border-radius: 50px;
  padding: 0.64rem 1.3rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;
  white-space: nowrap;
  cursor: pointer;
  margin-left: 10px; 
  &:hover {
    background-color: white;
    color: #1E88E5;
  }
`

const FimSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 4rem;
  background-color: #BBDEFB;
`
const TextoFim = styled.p`
  color: #212121;
  font-family: 'Roboto', sans-serif;
  align-items: center; 
  font-weight: 600;
`
const Paragraph = styled.p`
  display: flex; 
  flex-wrap: wrap; 
  margin: 0; 
`;

const Bazul = styled.a`
    background-color: #1E88E5;
    text-decoration: none;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    white-space: nowrap;
    &:hover {
        opacity: 0.5;
    }
`

export default function Home() {
  return (
    <>
      <Head>
        <title>MeuServiço - A melhor plataforma de serviços do Brasil</title>
        <meta name="description" content="Encontre os melhores profissionais para seus serviços" />
      </Head>

      <main>
        <HeroSection>
          <TextContainer>
            <Title>A melhor plataforma de serviços do Brasil</Title>
            <Subtitle>Encontre profissionais qualificados e confiáveis em diversos segmentos, prontos para realizar o seu projeto com excelência</Subtitle>
            <Bazul href=''>Conecte-se com quem faz a diferença</Bazul>
          </TextContainer>
          <ImageContainer><img src="/image1.png"/></ImageContainer>
        </HeroSection>

        <FeatureSection>
          <FeatureImage><img src="/image2.png"/></FeatureImage>
          <TextContainer>
            <FeatureTitle>Rapidez para encontrar serviços</FeatureTitle>
            <FeatureDescription>
              <span class="material-icons">check</span>
              Encontre serviços qualificados em minutos
            </FeatureDescription>
            <FeatureDescription>
              <span class="material-icons">check</span>
              Compare avaliações e escolha o melhor
            </FeatureDescription>
            <FeatureDescription>
              <span class="material-icons">check</span>
              Contrate com um clique e com Segurança
            </FeatureDescription>
            <Bazul href=''>Descubra agora</Bazul>
          </TextContainer>
        </FeatureSection>

        <VisibititySection>
          <TextContainer>
            <VisibitityTitle>Ganhe visibilidade e conquiste clientes!</VisibitityTitle>
            <Paragraph>
              <VisibitityA href="">Comece agora</VisibitityA>
              <VisibitityDuv href="">Tire suas duvidas aqui</VisibitityDuv>
            </Paragraph>
          </TextContainer>
          <VisibitityImage><img src="/image3.png"/></VisibitityImage>
        </VisibititySection>

        <FeatureSection>
          <FeatureImage><img src="/image4.png"/></FeatureImage>
          <TextContainer>
            <FeatureTitle>Também funciona para a sua empresa</FeatureTitle>
            <FeatureDescription>Encontre profissionais qualificados e confiáveis em diversos segmentos, prontos para realizar o seu projeto com excelência.</FeatureDescription>
            <Paragraph>
              <Bazul href="">Comece agora</Bazul>
              <Consultor href="">Fale com um consultor</Consultor>
            </Paragraph>
          </TextContainer>
        </FeatureSection>

        <StepsSection>
          <TitleSteps>Por que escolher a MeuServiço para sua Empresa?</TitleSteps>
          <TextoSteps>Os benefícios são pensados para facilitar a vida das empresas que precisam de soluções eficientes e confiáveis.</TextoSteps>
          <StepsList>
            <StepCard>
              <StepNumber>01</StepNumber>
              <TitleCard>Contratos Customizados</TitleCard>
              <TextoSteps>Personalize os contratos de acordo com as necessidades específicas do seu negócio, garantindo maior flexibilidade e segurança.</TextoSteps>
            </StepCard>

            <StepCard>
              <StepNumber>02</StepNumber>
              <TitleCard>Gerenciamento de Equipes</TitleCard>
              <TextoSteps>Gerencie múltiplos prestadores de serviço de forma centralizada, com ferramentas para delegar tarefas e acompanhar o progresso.</TextoSteps>
            </StepCard>

            <StepCard>
              <StepNumber>03</StepNumber>
              <TitleCard>Pagamentos Unificados</TitleCard>
              <TextoSteps>Simplifique seus pagamentos consolidando todas as transações em uma única fatura mensal.</TextoSteps>
            </StepCard>
          </StepsList>
        </StepsSection>
        
        <FimSection>
          <img src="/image5.png" height="250px"/>
          <TextoFim>Conecte-se com profissionais confiáveis e inicie seus projetos em minutos!</TextoFim>
          <Title>Pronto para iniciar?</Title>
          <Bazul href=''>Comece a melhor jornada da sua vida agora</Bazul>
        </FimSection>


      </main>
    </>
  )
}