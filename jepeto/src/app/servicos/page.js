"use client";
import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomCheckbox from '../components/checkbox';


const Container = styled.div`
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    min-height: 60vh;
    background-color: #f5f5f5;
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

const Label = styled.label`
    display: block;
    margin-bottom: 0.3rem; 
    color: #333;
    font-size: 0.85rem; 
    font-weight: 500;
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
    width: 102%;
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

const FormCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px; // Reduzindo um pouco a largura máxima
  width: 90%;
  margin: 2rem auto;
`;

const FormContainer = styled.form`
  flex: 1;
`;

export default function SolicitarServicoPage() {
    const router = useRouter();

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

    const formatCEP = (value) => {
        const numericValue = value.replace(/\D/g, '');
        return numericValue.replace(/(\d{5})(\d{3})/, '$1-$2');
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

    const togglePagamento = (pagamento) => {
        setFormData(prev => ({
            ...prev,
            pagamentos: prev.pagamentos.includes(pagamento)
                ? prev.pagamentos.filter(p => p !== pagamento)
                : [...prev.pagamentos, pagamento]
        }));
    };

    const toggleDia = (dia) => {
        setFormData(prev => ({
            ...prev,
            diasDisponiveis: prev.diasDisponiveis.includes(dia)
                ? prev.diasDisponiveis.filter(d => d !== dia)
                : [...prev.diasDisponiveis, dia]
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.categoria) newErrors.categoria = 'Selecione uma categoria';
        if (!formData.titulo) newErrors.titulo = 'Digite um título para o serviço';
        if (!formData.descricao) newErrors.descricao = 'Descreva o serviço necessário';
        if (!formData.urgencia) newErrors.urgencia = 'Selecione o nível de urgência';
        if (formData.pagamentos.length === 0) newErrors.pagamentos = 'Selecione pelo menos uma forma de pagamento';
        if (formData.diasDisponiveis.length === 0) newErrors.diasDisponiveis = 'Selecione pelo menos um dia disponível';
        if (!formData.cep) newErrors.cep = 'Digite o CEP';
        if (!formData.numero) newErrors.numero = 'Digite o número do endereço';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulando chamada API
            router.push('/dashboard');
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                submit: 'Erro ao enviar a solicitação. Tente novamente.'
            }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <FormCard>
                <FormContainer onSubmit={handleSubmit}>
                    <Title>Solicitar Serviço</Title>
                    <SubTitle>Descreva o serviço que você precisa</SubTitle>

                    {errors.submit && (
                        <ErrorMessage style={{ marginBottom: '1rem' }}>{errors.submit}</ErrorMessage>
                    )}

                    <TwoColumnLayout>
                        <Column>
                            <div>
                                <FormGroup>
                                    <Label>Categoria do serviço</Label>
                                    <Select
                                        name="categoria"
                                        value={formData.categoria}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecione uma categoria</option>
                                        {categorias.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </Select>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Nível de urgência</Label>
                                    <Select
                                        name="urgencia"
                                        value={formData.urgencia}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecione a urgência</option>
                                        {urgencias.map(urg => (
                                            <option key={urg} value={urg}>{urg}</option>
                                        ))}
                                    </Select>
                                    {errors.urgencia && <ErrorMessage>{errors.urgencia}</ErrorMessage>}
                                </FormGroup>
                            </div>

                            <FormGroup>
                                <Label>Formas de pagamento aceitas</Label>
                                <MultiSelect>
                                    {formasPagamento.map(pagamento => (
                                        <CustomCheckbox
                                            key={pagamento}
                                            checked={formData.pagamentos.includes(pagamento)}
                                            onChange={() => togglePagamento(pagamento)}
                                            label={pagamento}
                                        />
                                    ))}
                                </MultiSelect>
                            </FormGroup>
                        </Column>


                        <Column>
                            <div>
                                <FormGroup>
                                    <Label>Orçamento máximo (opcional)</Label>
                                    <Input
                                        type="number"
                                        name="orcamentoMaximo"
                                        placeholder="R$ 0,00"
                                        value={formData.orcamentoMaximo}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Disponibilidade</Label>
                                    <WeekDaySelect>
                                        {diasSemana.map(dia => (
                                            <CustomCheckbox
                                                key={dia}
                                                checked={formData.diasDisponiveis.includes(dia)}
                                                onChange={() => toggleDia(dia)}
                                                label={dia}
                                            />
                                        ))}
                                    </WeekDaySelect>
                                </FormGroup>
                            </div>

                            <TimeContainer>
                                <Input
                                    type="time"
                                    name="horarioInicio"
                                    value={formData.horarioInicio}
                                    onChange={handleChange}
                                    required
                                />
                                <span>até</span>
                                <Input
                                    type="time"
                                    name="horarioFim"
                                    value={formData.horarioFim}
                                    onChange={handleChange}
                                    required
                                />
                            </TimeContainer>
                        </Column>
                    </TwoColumnLayout>

                    <FormGroup>
                        <Label>Descrição detalhada do serviço</Label>
                        <TextArea
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            required
                            placeholder="Descreva em detalhes o serviço que você precisa..."
                        />
                        {errors.descricao && <ErrorMessage>{errors.descricao}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
                        <div style={{ flex: '1' }}>
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
                            {loading && (
                                <span style={{ color: '#666', fontSize: '0.8rem' }}>
                                    Buscando CEP...
                                </span>
                            )}
                            {cepError && <ErrorMessage>{cepError}</ErrorMessage>}
                        </div>
                        <div style={{ flex: '2' }}>
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
                        </div>
                    </FormGroup>

                    <FormGroup style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
                        <div style={{ flex: '4' }}>
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
                        </div>
                        <div style={{ flex: '1', maxWidth: '100px', marginRight: '0.5rem' }}> {/* Adicionado maxWidth para controlar o tamanho */}
                            <Label>Número</Label>
                            <Input
                                type="text"
                                name="numero"
                                placeholder="Nº"
                                value={formData.numero}
                                onChange={handleChange}
                                required
                                style={{ width: '100%' }}
                            />
                        </div>
                    </FormGroup>

                    <FormGroup style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ flex: '1', marginRight: '1rem' }}>
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
                        </div>
                        <div style={{ flex: '2' }}>
                            <Label>Complemento</Label>
                            <Input
                                type="text"
                                name="complemento"
                                placeholder="Apartamento, sala, etc"
                                value={formData.complemento}
                                onChange={handleChange}
                            />
                        </div>
                    </FormGroup>

                    <Button
                        type="submit"
                        disabled={loading || Object.keys(errors).length > 0}
                    >
                        {loading ? 'Enviando solicitação...' : 'Solicitar serviço'}
                    </Button>
                </FormContainer>
            </FormCard>
        </Container>
    );
}