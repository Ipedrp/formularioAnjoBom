# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


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