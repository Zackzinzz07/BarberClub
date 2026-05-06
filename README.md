📘 Projeto de Sistema Computacional - "BARBERCLUB"
Curso: Superior de Tecnologia em Análise e Desenvolvimento de Sistemas
Disciplina: Projeto Integrador I
Instituição: CEUB

👥 Alunos
Victor Hugo Souza Dantas - victor.hugod@sempreceub.com (RA: 22508274)
Mateus de Oliveira Mota - mateus.mota@sempreceub.com (RA: 22505243)
Bruno Henrique Cavalcante Lyra - bruno.lyra@sempreceub.com (RA: 22505644)
Iago Lima Gomes - iago.lima@sempreceub.com (RA: 22505579)
Isac Freitas - isac.freitas@sempreceub.com
Enzo Teles Miranda - enzo.teles@sempreceub.com (RA: 22510683)
0. Briefing
1. Informações gerais * 1.1 Nome do sistema: BARBERCLUB

1.2 Nome da equipe: SÍRUS
2. Problema e/ou necessidade * 2.1 O problema: Barbearias enfrentam dificuldades em manter uma receita estável, pois dependem do fluxo orgânico mensal de clientes. Há baixa previsibilidade financeira, dificuldade na fidelização e controle ineficiente de agendamentos. O sistema propõe um modelo de assinatura mensal para garantir receita recorrente, melhor gestão e maior retenção.

2.2 Dores dos usuários: Receita instável, baixa fidelização, controle manual de agendamentos/pagamentos, desorganização no uso dos serviços, dificuldade em gerenciar planos e pouca visão estratégica do negócio.
2.3 Cenário sem o sistema: Faturamento variável, clientes sem frequência definida, perda de oportunidades de receita recorrente, erros em processos manuais e dificuldade para escalar o negócio.
3. Escopo funcional do sistema * 3.1 Principal objetivo: Fornecer uma plataforma completa de gestão para barbearias baseada em assinaturas mensais, permitindo controle de clientes, planos, agendamentos, pagamentos e uso de serviços.

3.2 Funcionalidades específicas: Cadastro de clientes e empresas; gestão de planos de assinatura; controle de uso dos planos (limitado/ilimitado); agendamento de horários; controle de pagamentos recorrentes; relatórios de uso; dashboard financeiro; histórico de serviços; controle de cancelamento/pausa; e controle de acesso por perfis.
4. Escopo não funcional * Arquitetura e Tecnologia: Sistema Web.

Segurança: Criptografia de senhas, controle de acesso por níveis e proteção de dados conforme LGPD.
Desempenho: Respostas rápidas em operações (< 1s) e suporte a múltiplos usuários simultâneos.
Disponibilidade: Sistema 24/7.
Usabilidade: Interface intuitiva e responsiva (desktop e mobile).
Qualidade: Código modular, organizado e de fácil manutenção.
5. Usuários * Administrador: Gerencia todo o sistema, planos, usuários e relatórios.

Barbeiro: Gerencia atendimentos e agenda.
Cliente: Contrata planos e agenda serviços.
1. Documento de Visão do Sistema
Introdução O BARBERCLUB é um sistema web desenvolvido para auxiliar barbearias na gestão de clientes, serviços e finanças por meio de um modelo inovador de assinatura mensal. Ele surge para resolver a instabilidade financeira do setor, permitindo receita recorrente e otimização operacional.

Objetivos do sistema Resolver a receita instável, a baixa fidelização e o controle manual. Os benefícios esperados incluem geração de receita recorrente, automatização de processos, redução de erros, maior retenção de clientes e visão estratégica baseada em dados.

Stakeholders * Administrador da Barbearia: Gestão completa do sistema e análise de relatórios.

Barbeiros: Controle de agenda e atendimentos.
Clientes: Contratação de planos e agendamentos.
Empresas Parceiras: Contratação de planos corporativos.
Escopo (Módulos e Casos de Uso) * [UC1] Gerenciar Clientes (Cadastro, histórico e status).

[UC2] Gerenciar Planos de Assinatura (Configuração de pacotes e limites).
[UC3] Gerenciar Assinaturas (Contratação, cancelamento e renovação).
[UC4] Gerenciar Agendamentos (Marcação e disponibilidade).
[UC5] Controlar Uso dos Serviços (Auditoria e limites do plano).
[UC6] Gerenciar Financeiro (Pagamentos recorrentes e faturamento).
[UC7] Acessar Relatórios e Dashboard (Indicadores de desempenho).
[UC8] Gerenciar Controle de Acesso (Perfis e permissões).
Regras de Negócio * RN01: Cliente só utiliza serviços se possuir assinatura ativa.

RN02: O sistema bloqueia agendamentos gratuitos ao atingir o limite mensal do plano.
RN03: Renovação automática das assinaturas a cada ciclo mensal.
RN04: Clientes inadimplentes não podem agendar novos serviços.
RN05: Um barbeiro não pode ter dois atendimentos no mesmo horário.
RN06: Todo serviço realizado deve ser registrado.
RN07: Cancelamento respeita regras configuradas pela barbearia.
Restrições Plataforma obrigatoriamente web; conformidade com a LGPD; ausência de integração com contabilidade externa, aplicativos nativos ou folha de pagamento; disponibilidade 24/7 e respostas em menos de 1 segundo.

Critérios de sucesso Aumento da previsibilidade da receita, crescimento de clientes assinantes, redução de erros de agendamento, maior fidelização e adoção frequente do sistema pelos usuários.

2. Diagrama de Caso de Uso
Nota à equipe: Substituam os trechos abaixo pelas imagens geradas nas ferramentas de UML (Draw.io, PlantUML, StarUML, etc.).

Diagrama Nível 1
![Diagrama de Caso de Uso - Nível 1](./caminho/imagem_nivel1.png)

Diagrama Nível 2
![Diagrama de Caso de Uso - Nível 2](./caminho/imagem_nivel2.png)

Atores Identificados: * Administrador

Barbeiro
Cliente
Empresa Parceira
3. Especificação de Caso de Uso
Item	Descrição
Identificador e Nome	UC4.1 - Agendar Serviço no Plano
Ator Principal	Cliente
Pré-condições	Usuário logado como Cliente; possuir assinatura ativa (RN01); adimplente (RN04).
Fluxo Principal	1. Cliente acessa "Novo Agendamento"
2. Sistema lista serviços do plano
3. Cliente seleciona o serviço
4. Sistema lista barbeiros
5. Cliente seleciona o barbeiro
6. Sistema exibe horários livres
7. Cliente escolhe data/hora
8. Cliente confirma
9. Sistema salva e exibe sucesso
Fluxos Alternativos	Limite excedido: No passo 9, se o limite do plano foi atingido (RN02), sistema bloqueia e avisa.
Concorrência: No passo 9, se o horário foi recém-ocupado (RN05), sistema exibe erro e volta ao passo 6.
Pós-condições	Agendamento registrado na agenda do Barbeiro.
Regras de negócio	RN01, RN02, RN04, RN05

Item	Descrição
Identificador e Nome	UC3.1 - Contratar Plano
Ator Principal	Cliente
Pré-condições	Usuário logado; não possuir plano ativo.
Fluxo Principal	1. Cliente acessa "Planos"
2. Sistema exibe opções
3. Cliente clica em "Assinar" no plano escolhido
4. Sistema exibe checkout
5. Cliente insere dados do cartão
6. Sistema processa pagamento
7. Sistema ativa assinatura e agenda cobrança (RN03)
8. Sistema exibe sucesso
Fluxos Alternativos	Pagamento recusado: No passo 6, se o cartão falhar, sistema pede nova forma de pagamento e mantém assinatura inativa.
Pós-condições	Cliente se torna Assinante com serviços liberados.
Regras de negócio	RN03
4. Diagrama de Classe
Nota à equipe: Substituam o trecho abaixo pela imagem do Diagrama de Classes.

![Diagrama de Classes](./caminho/imagem_classes.png)

Classes identificadas e nomenclatura (Padrão: CL + Sequencial + UC de origem):

CL1UC8 - Usuario (Classe principal)
CL2UC1 - Cliente (Herda de Usuario)
CL3UC8 - Barbeiro (Herda de Usuario)
CL4UC2 - PlanoAssinatura (Armazena regras e limites)
CL5UC3 - Assinatura (Vínculo Cliente - Plano)
CL6UC4 - Agendamento (Reserva de horário)
CL7UC5 - Servico (Catálogo de cortes)
CL8UC6 - Pagamento (Cobrança recorrente)
