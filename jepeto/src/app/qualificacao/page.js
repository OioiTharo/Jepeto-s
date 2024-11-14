"use client";
import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomCheckbox from '../../../components/checkbox';

const Container = styled.div`
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    min-height: 60vh;
    background-color: #f5f5f5;
`;

const QualificacaoCard = styled.div`
    background: white;
    border-radius: 20px;
    padding: 1.5rem 2rem; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 1000px; 
    width: 80%;
    margin: 1.5rem auto; 
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

const ImagePreview = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem; 
    flex-wrap: wrap;

    img {
        width: 120px; 
        height: 120px; 
        object-fit: cover;
        border-radius: 6px; 
    }
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

const Logo = styled.div`
    text-align: center;
    margin-bottom: 1.5rem; 
    img {
        height: 60px; 
    }
`;

const Slider = styled.div`
    width: 100%;
    padding: 0.5rem 0;
    margin-bottom: 0; 
`;

const SliderInput = styled.input`
    width: 90%;
    -webkit-appearance: none;
    height: 4px;
    border-radius: 2px;
    background: #e0e0e0;
    outline: none;
    padding: 0;
    margin: 0;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #1E88E5;
        cursor: pointer;
        transition: background .15s ease-in-out;
    }

    &::-moz-range-thumb {
        width: 15px;
        height: 15px;
        border: 0;
        border-radius: 50%;
        background: #1E88E5;
        cursor: pointer;
        transition: background .15s ease-in-out;
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

const SliderValue = styled.div`
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: -15px;
`;


const ItemList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ItemRow = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const AddButton = styled.button`
    background: #1E88E5;
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px; 
    height: 24px; 
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 0.5rem; 

    .material-icons {
        font-size: 16px !important;; 
    }

    &:hover {
        opacity: 0.9;
    }
`;

const RemoveButton = styled.button`
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px; 
    height: 24px; 
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .material-icons {
        font-size: 16px !important;; 
    }

    &:hover {
        opacity: 0.9;
    }
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
    'TED'
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

export default function QualificacaoPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        categoria: '',
        experiencia: '',
        especialidades: [''],
        certificacoes: [''],
        imagens: [],
        pagamentos: [],
        descricao: '',
        areaAtendimento: 50,
        diasDisponiveis: [],
        horarioInicio: '08:00',
        horarioFim: '18:00'
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateField = (name, value) => {
        let fieldErrors = {};

        switch (name) {
            case 'categoria':
                if (!value) {
                    fieldErrors[name] = 'Selecione uma categoria';
                }
                break;

            case 'experiencia':
                if (!value) {
                    fieldErrors[name] = 'Informe sua experiência';
                }
                break;

            case 'pagamentos':
                if (value.length === 0) {
                    fieldErrors[name] = 'Selecione pelo menos uma forma de pagamento';
                }
                break;

            case 'diasDisponiveis':
                if (value.length === 0) {
                    fieldErrors[name] = 'Selecione pelo menos um dia disponível';
                }
                break;

            case 'descricao':
                if (!value.trim()) {
                    fieldErrors[name] = 'Forneça uma descrição dos seus serviços';
                }
                break;

            default:
                break;
        }

        setErrors(prev => ({
            ...prev,
            ...fieldErrors
        }));

        return Object.keys(fieldErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        validateField(name, value);
    };

    const handleEspecialidadeChange = (index, value) => {
        const newEspecialidades = [...formData.especialidades];
        newEspecialidades[index] = value;
        setFormData(prev => ({
            ...prev,
            especialidades: newEspecialidades
        }));
    };

    const addEspecialidade = () => {
        setFormData(prev => ({
            ...prev,
            especialidades: [...prev.especialidades, '']
        }));
    };

    const removeEspecialidade = (index) => {
        if (formData.especialidades.length > 1) {
            setFormData(prev => ({
                ...prev,
                especialidades: prev.especialidades.filter((_, i) => i !== index)
            }));
        }
    };

    const handleCertificacaoChange = (index, value) => {
        const newCertificacoes = [...formData.certificacoes];
        newCertificacoes[index] = value;
        setFormData(prev => ({
            ...prev,
            certificacoes: newCertificacoes
        }));
    };

    const addCertificacao = () => {
        setFormData(prev => ({
            ...prev,
            certificacoes: [...prev.certificacoes, '']
        }));
    };

    const removeCertificacao = (index) => {
        if (formData.certificacoes.length > 1) {
            setFormData(prev => ({
                ...prev,
                certificacoes: prev.certificacoes.filter((_, i) => i !== index)
            }));
        }
    };

    const handleImagemChange = (e) => {
        const files = Array.from(e.target.files);

        const imagePromises = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(imagePromises).then(results => {
            setFormData(prev => ({
                ...prev,
                imagens: [...prev.imagens, ...results]
            }));
        });
    };

    const removeImagem = (index) => {
        setFormData(prev => ({
            ...prev,
            imagens: prev.imagens.filter((_, i) => i !== index)
        }));
    };

    const togglePagamento = (pagamento) => {
        setFormData(prev => {
            const pagamentos = prev.pagamentos.includes(pagamento)
                ? prev.pagamentos.filter(p => p !== pagamento)
                : [...prev.pagamentos, pagamento];

            validateField('pagamentos', pagamentos);
            return { ...prev, pagamentos };
        });
    };

    const toggleDia = (dia) => {
        setFormData(prev => {
            const dias = prev.diasDisponiveis.includes(dia)
                ? prev.diasDisponiveis.filter(d => d !== dia)
                : [...prev.diasDisponiveis, dia];

            validateField('diasDisponiveis', dias);
            return { ...prev, diasDisponiveis: dias };
        });
    };

    const validateForm = () => {
        let formIsValid = true;
        let newErrors = {};

        if (!formData.categoria) {
            newErrors.categoria = 'Selecione uma categoria';
            formIsValid = false;
        }

        if (!formData.experiencia) {
            newErrors.experiencia = 'Informe sua experiência';
            formIsValid = false;
        }

        if (formData.especialidades.some(esp => !esp.trim())) {
            newErrors.especialidades = 'Preencha todas as especialidades';
            formIsValid = false;
        }

        if (formData.certificacoes.some(cert => !cert.trim())) {
            newErrors.certificacoes = 'Preencha todas as certificações';
            formIsValid = false;
        }

        if (formData.pagamentos.length === 0) {
            newErrors.pagamentos = 'Selecione pelo menos uma forma de pagamento';
            formIsValid = false;
        }

        if (formData.diasDisponiveis.length === 0) {
            newErrors.diasDisponiveis = 'Selecione pelo menos um dia disponível';
            formIsValid = false;
        }

        if (!formData.descricao.trim()) {
            newErrors.descricao = 'Forneça uma descrição dos seus serviços';
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            // API
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulando chamada API

            router.push('/dashboard'); // ROTA
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                submit: 'Erro ao salvar os dados. Tente novamente.'
            }));
        } finally {
            setLoading(false);
        }
    };


    return (
        <Container>
            <QualificacaoCard>
                <Title>Perfil profissional</Title>
                <SubTitle>Descreva sobre os servicos que você realiza</SubTitle>

                {errors.submit && (
                    <ErrorMessage style={{ marginBottom: '1rem' }}>{errors.submit}</ErrorMessage>
                )}
                <form onSubmit={handleSubmit}>
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
                                    <Label>Experiência desde</Label>
                                    <Input
                                        type="date"
                                        name="experiencia"
                                        value={formData.experiencia}
                                        onChange={handleChange}
                                        max={new Date().toISOString().split('T')[0]}
                                        required
                                    />
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
                                    <Label>Área de atendimento</Label>
                                    <Slider>
                                        <SliderInput
                                            type="range"
                                            min="1"
                                            max="100"
                                            name="areaAtendimento"
                                            value={formData.areaAtendimento}
                                            onChange={handleChange}
                                        />
                                        <SliderValue>{formData.areaAtendimento} km</SliderValue>
                                    </Slider>
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

                    <FormGroup style={{ marginTop: '1rem' }}>
                        <Label>Especialidades</Label>
                        <ItemList>
                            {formData.especialidades.map((esp, index) => (
                                <ItemRow key={`esp-${index}`}>
                                    <Input
                                        type="text"
                                        value={esp}
                                        onChange={(e) => handleEspecialidadeChange(index, e.target.value)}
                                        placeholder="Ex: Instalação elétrica residencial"
                                        required
                                    />
                                    {formData.especialidades.length > 1 && (
                                        <RemoveButton
                                            type="button"
                                            onClick={() => removeEspecialidade(index)}
                                        >
                                            <span class="material-icons">remove</span>
                                        </RemoveButton>
                                    )}
                                </ItemRow>
                            ))}
                        </ItemList>
                        <AddButton type="button" onClick={addEspecialidade}><span class="material-icons">add</span></AddButton>
                    </FormGroup>

                    <FormGroup>
                        <Label>Certificações</Label>
                        <ItemList>
                            {formData.certificacoes.map((cert, index) => (
                                <ItemRow key={`cert-${index}`}>
                                    <Input
                                        type="text"
                                        value={cert}
                                        onChange={(e) => handleCertificacaoChange(index, e.target.value)}
                                        placeholder="Ex: Curso técnico em elétrica"
                                        required
                                    />
                                    {formData.certificacoes.length > 1 && (
                                        <RemoveButton
                                            type="button"
                                            onClick={() => removeCertificacao(index)}
                                        >
                                            <span class="material-icons">remove</span>
                                        </RemoveButton>
                                    )}
                                </ItemRow>
                            ))}
                        </ItemList>
                        <AddButton type="button" onClick={addCertificacao}><span class="material-icons">add</span></AddButton>
                    </FormGroup>

                    <FormGroup>
                        <Label>Imagens dos seus trabalhos</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImagemChange}
                        />
                        {formData.imagens.length > 0 && (
                            <ImagePreview>
                                {formData.imagens.map((img, index) => (
                                    <div key={index} style={{ position: 'relative' }}>
                                        <img src={img} alt={`Trabalho ${index + 1}`} />
                                        <RemoveButton
                                            type="button"
                                            onClick={() => removeImagem(index)}
                                            style={{
                                                position: 'absolute',
                                                top: '-10px',
                                                right: '-10px',
                                                width: '24px',
                                                height: '24px',
                                                fontSize: '16px'
                                            }}
                                        >
                                            ×
                                        </RemoveButton>
                                    </div>
                                ))}
                            </ImagePreview>
                        )}
                    </FormGroup>

                    <FormGroup>
                        <Label>Descrição detalhada dos seus serviços</Label>
                        <TextArea
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            required
                            placeholder="Descreva seus serviços, experiência e diferenciais..."
                        />
                    </FormGroup>

                    <Button
                        type="submit"
                        disabled={loading || Object.values(errors).some(error => error)}
                    >
                        {loading ? 'Salvando...' : 'Finalizar cadastro'}
                    </Button>
                </form>
            </QualificacaoCard>
        </Container>
    );
}