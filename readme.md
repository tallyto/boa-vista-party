# Boa Vista Party

**Descrição do Projeto**: O Boa Vista Party é uma plataforma web desenvolvida em Node.js e Express que oferece um espaço dedicado ao gerenciamento de eventos e ações acadêmicas na cidade de Boa Vista, Roraima. Esta plataforma permite que estudantes e organizadores de eventos publiquem e gerenciem informações sobre eventos acadêmicos, festas e outras atividades relacionadas à vida acadêmica na região.

## Tabela de Conteúdos
- [Instalação](#instalação)
- [Uso](#uso)
- [Funcionalidades](#funcionalidades)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Instalação

Para executar o Boa Vista Party localmente, siga estas etapas:

1. Clone o repositório:
   ```bash
   git clone https://github.com/tallyto/boa-vista-party.git
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd boa-vista-party
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure o banco de dados MongoDB de acordo com suas necessidades.

5. Inicie o servidor:
   ```bash
   npm start
   ```

6. Abra o navegador e acesse o aplicativo em http://localhost:3000.

## Uso

O Boa Vista Party oferece as seguintes funcionalidades:

- Cadastro de eventos: Os organizadores podem criar eventos, fornecendo detalhes como nome, data, local, descrição e informações de contato.

- Pesquisa de eventos: Os estudantes podem pesquisar eventos por categoria, data ou localização para encontrar atividades que sejam de seu interesse.

- Gerenciamento de eventos: Os organizadores podem editar ou excluir eventos previamente cadastrados, mantendo as informações atualizadas.

- Autenticação de usuário: A plataforma oferece autenticação de usuário com o uso do Passport, permitindo que os usuários façam login e gerenciem seus eventos.

## Funcionalidades

- **Sistema de Autenticação**: O projeto utiliza o Passport.js para autenticação de usuário. Os usuários podem criar contas, fazer login e gerenciar seus eventos.

- **Renderização de Páginas com Handlebars**: O Express-handlebars é utilizado para renderizar as páginas HTML do aplicativo.

- **Banco de Dados MongoDB**: Os dados dos eventos são armazenados em um banco de dados MongoDB.

## Contribuição

Se você deseja contribuir para o projeto Boa Vista Party, siga estas diretrizes:

1. Faça um fork do projeto.
2. Crie uma nova branch: `git checkout -b minha-contribuicao`.
3. Faça suas mudanças e faça commit: `git commit -m 'Adicionei uma nova funcionalidade'`.
4. Envie suas mudanças: `git push origin minha-contribuicao`.
5. Abra um pull request na branch principal do projeto.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Contato

Se você tiver alguma dúvida ou precisar entrar em contato, você pode enviar um e-mail para [rodrigues.tallyto@gmail.com] ou visitar o perfil do GitHub em [Tallyto](https://github.com/tallyto).
