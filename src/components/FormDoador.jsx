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

    const [erros, setErros] = useState({});

    // Estado para armazenar os valores dos inputs
    const [formValues, setFormValues] = useState({
        nome: '',
        telefone: '',
        email: ''
    });

    const [todosDados, setTodosDados] = useState([])

    useEffect(() => {
        console.log("Aqui são os dados atualizados", todosDados);
    }, [todosDados]); // Este useEffect é chamado sempre que todosDados muda


    // Função para atualizar os valores conforme o usuário digita
    const handleChange = (e, { name, value }) => {
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));

        setErros(prevState => {
            const newErros = { ...prevState };
            switch (name) {
                case "nome":
                    if (value.length > 60) {
                        newErros.nome = "Nome deve ter no máximo 60 caracteres";
                    } else if (value.length < 15) {
                        newErros.nome = "Nome deve ter no mínimo 15 caracteres";
                    } else {
                        newErros.nome = "";
                    }
                    break;
                case "telefone":
                    if (value.length > 15) {
                        newErros.telefone = "Telefone deve ter 15 caracteres";
                    } else {
                        newErros.telefone = "";
                    }
                    break;
                case "email":
                    if (value.length > 29) {
                        newErros.email = "E-mail máximo 30 caracteres";
                    } else {
                        newErros.email = "";
                    }
                    break;
                default:
                    break;
            }

            return newErros;
        });
    };



    function voltarParaContato() {
        setStepFormContact(true);
        setStepFormAndress(false);
    }

    function irParaEndereco() {
        setStepFormContact(false);
        setStepFormAndress(true);
    }

    function voltarParaEndereco() {
        setStepVerification(false);
        setStepFormAndress(true);
    }

    function irParaVerificacao() {
        setStepFormAndress(false);
        setStepVerification(true);
    }

    function enviarFormulario() {
        console.log("Dados do formulário:", formValues); // Mostra os dados do formulário antes de atualizar

        setTodosDados(prevTodosDados => [...prevTodosDados, formValues]); // Adiciona os novos dados ao array existente
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
                                        error={!!erros.nome && { content: erros.nome }}
                                        label={<label className="blue-label">Nome</label>}
                                        placeholder="Digite seu nome"
                                        name="nome"
                                        type="text"
                                        maxLength={61}
                                        minLength={15}
                                        value={formValues.nome}
                                        onChange={handleChange}
                                    />
                                    <FormInput
                                        icon='phone'
                                        iconPosition='left'
                                        fluid
                                        error={!!erros.telefone && { content: erros.telefone }}
                                        label={<label className="blue-label">Telefone</label>}
                                        placeholder="Digite seu telefone"
                                        name="telefone"
                                        maxLength={16}
                                        value={formValues.telefone}
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
                                        maxLength={30}
                                        value={formValues.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Form>
                        </main>

                        <footer className="wizard-footer">
                            <Button type='submit' className="btn-internal-forms-back">nao faz nada</Button>
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
                                        error={!!erros.cep && { content: erros.cep }}
                                        label={<label className="blue-label">CEP</label>}
                                        placeholder="Digite seu cep"
                                        name="cep"
                                        type="text"
                                        maxLength={20}
                                        value={formValues.cep}
                                        onChange={handleChange}
                                    />
                                    <FormGroup widths='equal'>
                                        <FormInput
                                            fluid
                                            error={!!erros.rua && { content: erros.rua }}
                                            label={<label className="blue-label">Rua</label>}
                                            placeholder="Digite seu rua"
                                            name="rua"
                                            type="text"
                                            maxLength={20}
                                            value={formValues.rua}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            fluid
                                            error={!!erros.bairro && { content: erros.bairro }}
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
                                            error={!!erros.logradouro && { content: erros.logradouro }}
                                            label={<label className="blue-label">Logradouro</label>}
                                            placeholder="Digite seu logradouro"
                                            name="logradouro"
                                            type="text"
                                            maxLength={20}
                                            value={formValues.logradouro}
                                            onChange={handleChange}
                                        />

                                    </FormGroup>
                                    <FormGroup widths='equal'>
                                        <FormInput
                                            fluid
                                            error={!!erros.numero && { content: erros.numero }}
                                            label={<label className="blue-label">numero</label>}
                                            placeholder="Digite seu numero"
                                            name="numero"
                                            type="text"
                                            maxLength={20}
                                            value={formValues.n}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            fluid
                                            error={!!erros.cidade && { content: erros.cidade }}
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
                                            error={!!erros.estado && { content: erros.estado }}
                                            label={<label className="blue-label">Estado</label>}
                                            placeholder="Digite seu estado"
                                            name="estado"
                                            type="text"
                                            maxLength={20}
                                            value={formValues.estado}
                                            onChange={handleChange}
                                        />

                                    </FormGroup>

                                    <FormTextArea
                                        error={!!erros.pontoReferencia && { content: erros.pontoReferencia }}
                                        label={<label className="blue-label">Ponto de referência</label>}
                                        placeholder='Descreva ponto de conferência  do seu endereço'
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
                                    <p>Enviar código</p>
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