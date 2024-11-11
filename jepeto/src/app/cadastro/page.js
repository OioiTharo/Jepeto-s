"use client";

import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    min-height: 70vh;
    background-color: #FFFFFF;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    flex: 1;
`;

const Title = styled.h1`
    color: #1E88E5;
    font-size: 1.5rem;
    margin-bottom: 3rem;
    text-align: center;
`;

const CardsContainer = styled.div`
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
`;

const Card = styled.div`
    background-color: #1E88E5;
    border-radius: 1rem;
    padding: 2rem;
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-5px);
    }
`;

const CardImage = styled.div`
    width: 300px;
    height: 300px;
    margin-bottom: 1rem;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const Button = styled.button`
    background-color: white;
    color: #5D5A88;
    font-weight: bold;
    border: none;
    border-radius: 2rem;
    padding: 0.8rem 1.5rem;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f0f0f0;
    }
`;

export default function CadastroPage() {
    return (
        <Container>
            <Content>
                <Title>Para começar a nossa jornada, você precisa se identificar!</Title>
                <CardsContainer>
                    <Link href="/cadastro/cliente" passHref>
                        <Card>
                            <CardImage>
                                <img src="/image1cadastro.png" alt="Contratar especialista" />
                            </CardImage>
                            <Button>Contratar um especialista</Button>
                        </Card>
                    </Link>

                    <Link href="/cadastro/profissional" passHref>
                        <Card>
                            <CardImage>
                                <img src="/image2cadastro.png" alt="Cadastrar como profissional" />
                            </CardImage>
                            <Button>Cadastrar como profissional</Button>
                        </Card>
                    </Link>
                </CardsContainer>
            </Content>
        </Container>
    );
}