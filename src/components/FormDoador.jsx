import React, { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';

import {
    Container,
    Segment,
    Grid,
    BreadcrumbSection,
    BreadcrumbDivider,
    Breadcrumb,
    Label,
    Divider,
    Header,
    FormField,
    Button,
    Checkbox,
    Form,
    FormInput,
    FormGroup,
    FormTextArea,
    Icon,
    TextArea,

} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import "./FormDoador.css"



function FormDoador() {


    const [stepFormContact, setStepFormContact] = useState(true);
    const [stepFormAndress, setStepFormAndress] = useState(false);
    const [stepVerification, setStepVerification] = useState(false);
    const [msgCodigo, setMsgCodigo] = useState(false);

    const [erros, setErros] = useState({
        address: {} // Inicializamos com um objeto address vazio
    });
    // Estado para armazenar os valores dos inputs
    const [formValues, setFormValues] = useState({
        name: '',
        last_name: '',
        email: '',
        phone: '',
        motivation: '',
        address: {
            cep: '',
            estado: '',
            cidade: '',
            bairro: '',
            logradouro: '',
            rua: '',
            numero: '',
            pontoReferencia: ''
        },

    });

    const [todosDados, setTodosDados] = useState([])

    useEffect(() => {
        console.log("Aqui são os dados atualizados", todosDados);
    }, [todosDados]); // Chamado sempre que todosDados muda


    // Função para atualizar os valores conforme o usuário digita
    const handleChange = (e, { name, value }) => {

        console.log("Mudança detectada:", name, value);
        console.log("Estado antes da atualização:", formValues);

        if (name in formValues.address) {
            setFormValues(prevState => {
                console.log("Atualizando address", prevState.address);
                return {
                    ...prevState,
                    address: {
                        ...prevState.address,
                        [name]: value
                    }
                };
            });
        } else {
            setFormValues(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

        console.log("Estado após a atualização:", formValues);


        setErros(prevState => {
            const newErros = { ...prevState };
            switch (name) {
                case "name":
                    if (value.length > 29) {
                        newErros.name = "Máximo 30 caracteres";
                    } else {
                        newErros.name = "";
                    }
                    break;
                case "last_name":
                    if (value.length > 59) {
                        newErros.last_name = "Máximo 60 caracteres";
                    } else {
                        newErros.last_name = "";
                    }
                    break;
                case "phone":
                    if (value.length > 15) {
                        newErros.phone = "Máximo 15 caracteres";
                    } else {
                        newErros.phone = "";
                    }
                    break;
                case "email":
                    if (value.length > 44) {
                        newErros.email = "Máximo 45 caracteres";
                    } else {
                        newErros.email = "";
                    }
                    break;
                case "motivation":
                    if (value.length > 149) {
                        newErros.motivation = "Máximo 150 caracteres";
                    } else {
                        newErros.motivation = "";
                    }
                    break;
                case "cep":
                    if (value.length > 9) {
                        newErros.address.cep = "Máximo 9 caracteres";
                    } else {
                        newErros.address.cep = ""; // Limpa o erro se estiver válido
                    }
                    break;
                default:
                    break;
            }

            return newErros;
        });
    };

    const updateCep = (value) => {
        setFormValues(prevState => ({
            ...prevState,
            address: {
                ...prevState.address,
                cep: value
            }
        }));
    };


    function voltarParaContato() {
        setStepFormContact(true);
        setStepFormAndress(false);
    }

    function irParaEndereco() {
        let valid = true; // Inicializamos como verdadeiro e vamos alterar caso haja erros
        let newErros = {};

        // Verifica se o nome está vazio
        if (!formValues.name) {
            newErros.name = "Nome é obrigatório";
            valid = false;
        }
        if (!formValues.last_name) {
            newErros.last_name = "Sobrenome é obrigatório";
            valid = false;
        }
        if (!formValues.phone) {
            newErros.phone = "Telefone é obrigatório";
            valid = false;
        }
        if (!formValues.email) {
            newErros.email = "E-mail é obrigatório";
            valid = false;
        }
        if (!formValues.motivation) {
            newErros.motivation = "Motivação é obrigatório";
            valid = false;
        }
        // Se válido, vai para o endereço
        if (valid) {
            setStepFormAndress(true);
            setStepFormContact(false);
        } else {
            setStepFormContact(true); // Mantém na etapa de contato
        }

        // Atualiza os erros
        setErros(newErros);
    }



    function voltarParaEndereco() {
        setStepVerification(false);
        setStepFormAndress(true);
    }

    function irParaVerificacao() {



        setStepVerification(true);
        setStepFormAndress(false);

    }


    function enviarCodigo() {
        setMsgCodigo(true)

    }

    async function enviarFormulario() {
        console.log("Dados do formulário:", formValues);

        setTodosDados(prevTodosDados => [...prevTodosDados, formValues]);

        try {
            // Envia os dados para o backend via POST
            const response = await fetch('http://localhost:5000/person/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues), // Converte o objeto formValues para JSON

            });

            if (!response.ok) {
                throw new Error('Erro ao enviar dados para o servidor');
            }

            const data = await response.json();
            console.log('Resposta do servidor:', data);

            // Caso você queira limpar o formulário após o envio
            setFormValues({
                name: '',
                last_name: '',
                email: '',
                phone: '',
                motivation: '',
                address: {
                    cep: '',
                    estado: '',
                    cidade: '',
                    bairro: '',
                    rua: '',
                    numero: ''
                }
            });
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    }
    const isMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <>
            <div className="container-formulario">


                {/* Step formulario Contato*/}


                {stepFormContact ?
                    <div className="wizard-form">
                        <header className="wizard-header">
                            {isMobile ?
                                /*Modo mobile para Step Contato */
                                <div>
                                    <Container textAlign="center">
                                        <Breadcrumb>
                                            <Label circular className="color-label-circle-active">1</Label>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle">2</Label>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle">3</Label>
                                        </Breadcrumb>
                                    </Container>
                                    <Divider horizontal>
                                        <Header as='h4' className="header-form">
                                            Contato
                                        </Header>
                                    </Divider>
                                </div>

                                /*Modo computador para Step Contato */

                                : <div>

                                    <Container textAlign="center">
                                        <Breadcrumb>
                                            <Label circular className="color-label-circle-active">1</Label>
                                            <BreadcrumbSection>Contato</BreadcrumbSection>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle">2</Label>
                                            <BreadcrumbSection >Endereço</BreadcrumbSection>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle">3</Label>
                                            <BreadcrumbSection >Verificação</BreadcrumbSection>
                                        </Breadcrumb>
                                    </Container>
                                    <Divider inverted />
                                </div>
                            }
                        </header>

                        <main className="wizard-main">
                            <Form>
                                <div className="form-inputs">
                                    {/* Inputs dinâmicos de cada etapa */}
                                    <FormInput
                                        fluid
                                        error={!!erros.name && { content: erros.name }}
                                        label={<label className="blue-label">Nome</label>}
                                        placeholder="Digite seu nome"
                                        name="name"
                                        type="text"
                                        maxLength={30}
                                        value={formValues.name}
                                        onChange={handleChange}
                                    />
                                    <FormInput
                                        fluid
                                        error={!!erros.last_name && { content: erros.last_name }}
                                        label={<label className="blue-label">Sobrenome</label>}
                                        placeholder="Digite seu sobrenome"
                                        name="last_name"
                                        type="text"
                                        maxLength={60}
                                        value={formValues.last_name}
                                        onChange={handleChange}
                                    />
                                    <FormInput
                                        icon='phone'
                                        iconPosition='left'
                                        fluid
                                        error={!!erros.phone && { content: erros.phone }}
                                        label={<label className="blue-label">Telefone</label>}
                                        placeholder="Digite seu telefone"
                                        name="phone"
                                        type="text"
                                        maxLength={16}
                                        value={formValues.phone}
                                        onChange={handleChange}
                                    />
                                    <FormInput
                                        icon='mail'
                                        iconPosition='left'
                                        fluid
                                        error={!!erros.email && { content: erros.email }}
                                        label={<label className="blue-label">E-mail</label>}
                                        placeholder="Digite seu e-mail"
                                        name="email"
                                        maxLength={45}
                                        value={formValues.email}
                                        onChange={handleChange}
                                    />
                                    <FormTextArea
                                        fluid
                                        error={!!erros.motivation && { content: erros.motivation }}
                                        label={<label className="blue-label">Motivação</label>}
                                        placeholder="Descreva qual a sua motivação para realizar sua doação"
                                        name="motivation"
                                        type="text"
                                        maxLength={150}
                                        value={formValues.motivation}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Form>
                        </main>

                        <footer className="wizard-footer-contact">
                            <Button type='submit' className="btn-internal-forms-continous" onClick={irParaEndereco}>Continuar</Button>
                        </footer>
                    </div>

                    : null
                }


                {/* Step formulario endereço*/}


                {stepFormAndress ?
                    <div className="wizard-form">
                        <header className="wizard-header">
                            {isMobile ?
                                /*Modo mobile para Step Endereço */
                                <div>
                                    <Container textAlign="center">
                                        <Breadcrumb>
                                            <Icon name="check circle" size="large" className="color-label-circle-sucess" />
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle-active">2</Label>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle">3</Label>
                                        </Breadcrumb>
                                    </Container>
                                    <Divider horizontal>
                                        <Header as='h4' className="header-form">
                                            Endereço
                                        </Header>
                                    </Divider>
                                </div>

                                /*Modo computador para Step Endereço */

                                : <div>

                                    <Container textAlign="center">
                                        <Breadcrumb>
                                            <Icon name="check circle" size="large" className="color-label-circle-sucess" />
                                            <BreadcrumbSection>Contato</BreadcrumbSection>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle-active">2</Label>
                                            <BreadcrumbSection >Endereço</BreadcrumbSection>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle">3</Label>
                                            <BreadcrumbSection >Verificação</BreadcrumbSection>
                                        </Breadcrumb>
                                    </Container>
                                    <Divider inverted />
                                </div>
                            }
                        </header>

                        <main className="wizard-main">
                            <Form>
                                <div className="form-inputs">
                                    {/* Inputs dinâmicos de cada etapa */}
                                    <FormInput
                                        fluid
                                        error={!!(erros.address && erros.address.cep) && { content: erros.address.cep }}
                                        label={<label className="blue-label">CEP</label>}
                                        placeholder="Digite seu cep"
                                        name="cep"
                                        type="text"
                                        maxLength={9}
                                        value={formValues.address.cep}
                                        onChange={(e) => updateCep(e.target.value)}  // Atualiza diretamente
                                        />

                                    <FormGroup widths='equal'>
                                        <FormInput
                                            fluid
                                            error={!!(erros.address && erros.address.rua) && { content: erros.address.rua }}
                                            // error={!!erros.address.rua && { content: erros.address.rua }}
                                            label={<label className="blue-label">Rua</label>}
                                            placeholder="Digite seu rua"
                                            name="rua"
                                            type="text"
                                            maxLength={25}
                                            value={formValues.rua}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            fluid
                                            error={!!(erros.address && erros.address.bairro) && { content: erros.address.bairro }}
                                            label={<label className="blue-label">Bairro</label>}
                                            placeholder="Digite seu bairro"
                                            name="bairro"
                                            type="text"
                                            maxLength={20}
                                            value={formValues.bairro}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            fluid
                                            error={!!(erros.address && erros.address.logradouro) && { content: erros.address.logradouro }}
                                            label={<label className="blue-label">Logradouro</label>}
                                            placeholder="Digite seu logradouro"
                                            name="logradouro"
                                            type="number"
                                            maxLength={20}
                                            value={formValues.logradouro}
                                            onChange={handleChange}
                                        />

                                    </FormGroup>
                                    <FormGroup widths='equal'>
                                        <FormInput
                                            fluid
                                            error={!!(erros.address && erros.address.numero) && { content: erros.address.numero }}
                                            label={<label className="blue-label">Número</label>}
                                            placeholder="Digite seu numero"
                                            name="numero"
                                            type="text"
                                            maxLength={6}
                                            value={formValues.numero}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            fluid
                                            error={!!(erros.address && erros.address.cidade) && { content: erros.address.cidade }}
                                            label={<label className="blue-label">Cidade</label>}
                                            placeholder="Digite seu cidade"
                                            name="cidade"
                                            type="text"
                                            maxLength={20}
                                            value={formValues.cidade}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            fluid
                                            error={!!(erros.address && erros.address.estado) && { content: erros.address.estado }}
                                            label={<label className="blue-label">Estado</label>}
                                            placeholder="Digite seu estado"
                                            name="estado"
                                            type="text"
                                            maxLength={15}
                                            value={formValues.estado}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <FormTextArea
                                        fluid
                                        error={!!(erros.address && erros.address.pontoReferencia) && { content: erros.address.pontoReferencia }}
                                        label={<label className="blue-label">Ponto de referência</label>}
                                        placeholder="Descreva ponto de referência do seu endereço"
                                        name="pontoReferencia"
                                        maxLength={100}
                                        value={formValues.pontoReferencia}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Form>
                        </main>

                        <footer className="wizard-footer">
                            <Button type='submit' className="btn-internal-forms-back" onClick={voltarParaContato}>Voltar</Button>
                            <Button type='submit' className="btn-internal-forms-continous" onClick={irParaVerificacao}>Continuar</Button>
                        </footer>
                    </div>

                    : null
                }


                {/* Step formulario Verificação*/}

                {stepVerification ?
                    <div className="wizard-form">
                        <header className="wizard-header">
                            {isMobile ?
                                /*Modo mobile para Step Verificação */
                                <div>
                                    <Container textAlign="center">
                                        <Breadcrumb>
                                            <Icon name="check circle" size="large" className="color-label-circle-sucess" />
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Icon name="check circle" size="large" className="color-label-circle-sucess" />
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle-active">3</Label>
                                        </Breadcrumb>
                                    </Container>
                                    <Divider horizontal>
                                        <Header as='h4' className="header-form">
                                            Verificação
                                        </Header>
                                    </Divider>
                                </div>

                                /*Modo computador para Step Verificação */

                                : <div>

                                    <Container textAlign="center">
                                        <Breadcrumb>
                                            <Icon name="check circle" size="large" className="color-label-circle-sucess" />
                                            <BreadcrumbSection>Contato</BreadcrumbSection>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Icon name="check circle" size="large" className="color-label-circle-sucess" />
                                            <BreadcrumbSection >Endereço</BreadcrumbSection>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle-active">3</Label>
                                            <BreadcrumbSection >Verificação</BreadcrumbSection>
                                        </Breadcrumb>
                                    </Container>
                                    <Divider inverted />
                                </div>
                            }
                        </header>

                        <main className="wizard-main">
                            <Form>
                                <div className="form-inputs">
                                    {/* Inputs dinâmicos de cada etapa */}
                                    <FormInput
                                        fluid
                                        error={!!erros.codigoVerificacao && { content: erros.codigoVerificacao }}
                                        label={<label className="blue-label">Código de verificação</label>}
                                        placeholder="Digite o código de verificação"
                                        name="codigoVerificacao"
                                        type="text"
                                        maxLength={20}
                                        value={formValues.codigoVerificacao}
                                        onChange={handleChange}
                                    />
                                    {msgCodigo ? <p className="msg-codigo-verificacao">Um código de verificação foi enviado para o seu celular</p>
                                        : null}
                                    <button type="submit" className="btn-enviar-codigo" onClick={enviarCodigo} >Enviar código</button>
                                    <div className="div-nao-recebeu-codigo">
                                        <p>Não recebeu o código?</p>
                                        <p className="reenviar-codigo">Clique aqui para reenviar</p>
                                    </div>
                                    <Checkbox
                                        label={
                                            <label>Ao aceitar, você concorda com os Termos de Uso e
                                                Política de Privacidade do site</label>
                                        }
                                        defaultChecked
                                    />

                                </div>
                            </Form>
                        </main>

                        <footer className="wizard-footer">
                            <Button type='submit' className="btn-internal-forms-back" onClick={voltarParaEndereco}>Voltar</Button>
                            <Button type='submit' className="btn-internal-forms-continous" onClick={enviarFormulario}>Enviar</Button>
                        </footer>
                    </div>

                    : null
                }


            </div>

        </>
    )
}

export default FormDoador;