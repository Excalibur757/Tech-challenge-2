<h1 align="center">
  <a href="https://github.com/FIAP-Grupo20/tech_challenge-fase1">
    Tech Challenge - Fase 01: Gerenciador Financeiro
  </a>
</h1>

O objetivo é um front-end para uma aplicação de gerenciamento financeiro. A interface permite que os usuários gerenciem suas transações financeiras, utilizando **Next.js** e um **Design System** documentado.

<br />

## 📖 Índice

* 🎯 Sobre o Projeto
* ✨ Features (Requisitos)
* 🛠️ Tecnologias Utilizadas
* 🚀 Começando (Executando o Projeto)
* 🎨 Design System
* 🎥 Vídeo Demonstrativo

<br />

## 🎯 Sobre o Projeto

Este projeto foca na construção de uma interface rica e funcional para um app financeiro. Embora um [link do Figma](https://www.figma.com/design/ns5TC3X5Xr8V7I3LYKg9KA/Projeto-Financeiro?node-id=80-199&p=f&t=Y821nsQ9qA67Fg4v-0) tenha sido fornecido como referência, o desenvolvimento priorizou a **consistência visual, boa usabilidade e acessibilidade**, não seguindo o layout de forma estrita. O back-end da aplicação é simulado, com dados mockados diretamente no front-end.

<br />

## ✨ Features (Requisitos)

O projeto cumpre com os seguintes requisitos funcionais:

- **Home Page:**
  * Container com boas-vindas ao usuário.
  * Exibição do saldo da conta corrente e extrato das últimas transações.
  * Seção para iniciar uma nova transação (seleção de tipo, valor e descrição).
 
 - **Listagem de Transações:**
   - Um container que exibe a lista completa de transações realizadas.

- **Gerenciamento de Transações:**
  * É possível **visualizar detalhes**, **editar** e **deletar** cada transação.

- **Adicionar Nova Transação:**
    - Um container dedicado para adicionar uma nova transação.
  * Formulário com campos para tipo de transação, valor, data e descrição.
    
- **Editar Transação:**
  * Um modal para editar as informações de uma transação existente.

<br />

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias obrigatórias e ferramentas:

* [**Next.js**](https://nextjs.org/)**:** Framework React usado para estruturar e organizar o projeto.
* [**React**](https://reactjs.org/)**:** Biblioteca principal para a construção da interface.
* **CSS Modules:** Usado para estilos específicos de páginas ou componentes.
* **Styled-Components:** Usado para criar componentes de UI reutilizáveis e "tokenizados", que formam o núcleo do nosso sistema.
* **GitBook:** Ferramenta para documentar os componentes do Design System.
* **Bootstrap:** Utilizado para agilizar o desenvolvimento do layout macro e para classes utilitárias.

<br />

## 🚀 Começando (Executando o Projeto)

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 18.x ou superior)
* [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)

### Instalação

1.  Clone o repositório:

    ```bash
    git clone https://github.com/FIAP-Grupo20/tech_challenge-fase1.git
    ```
2.  Navegue até o diretório do projeto:

    ```bash
    cd tech_challenge-fase1
    ```
3.  Instale as dependências:

    ```bash
    npm install
    # ou
    yarn install
    ```

### Executando a aplicação

1.  Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    # ou
    yarn dev
    ```
2. Abra [http://localhost:3000](http://localhost:3000) em seu navegador para ver a aplicação.

<br />

## 🎨 Design System

Conforme o requisito, foi criado um Design System para garantir consistência visual e reutilização de componentes.

A documentação completa, detalhando os **Design Tokens** (cores, tipografia, espaçamento) e os compoenentes, está disponível em nosso **GitBook**.

➡️ [Acesse a documentação do Design System aqui.](https://fiap-grupo-20.gitbook.io/tech-challenge-1-design-system/)

<br />

## 🎥 Vídeo Demonstrativo

Um vídeo de até 5 minutos foi gravado para demonstrar todo o fluxo do front-end, incluindo navegação, listagem, adição, edição e exclusão de transações, conforme solicitado.

➡️ [Assista ao vídeo demonstrativo aqui.](https://www.youtube.com/watch?v=7yawItuhJDM)

<br />

***

Feito por **Isabelle D. R. Silva (RM367409), Kevin L. Santos (RM369050), Mariana Ayumi Tamay (RM367047) e Pedro Henrique Moura (RM367447).**
