# SMM Solutions - Control Dashboard

Esse é o servidor do dashboard administrativo! Abaixo estão as instruções de como executá-lo.

O primeiro passo é clonar este repositório, para que você tenha uma cópia dele com você, localmente. Estes links podem te ajudar com isso: 
- [download do Git](https://git-scm.com/downloads)
- [como clonar um repositório](https://www.youtube.com/watch?v=w7JF8XSlO2M) 

A estrutura abaixo é uma sugestão para você organizar seus repositórios (considerando os outros três que compoem o website):
```
./smm-solutions  
├── private  
│   ├── smm-solutions-dashboard  
│   └── smm-solutions-dashboard-server
└── public  
    ├── smm-solutions-website  
    └── smm-solutions-website-server
``` 

<br>

## Requisitos
O banco de dados utilizado na aplicação é o PostgreSQL, que será usado através do [Docker](https://www.youtube.com/watch?v=-pUZBovqRcU).
### 1. Instalação do Docker
- Caso seu Sistema Operacional seja `Linux`, como o meu, este guia vai ajudar: [Docker Engine](https://docs.docker.com/engine/install/);
- Mas, caso seja `Windows` ou `MacOS`, use estes guias aqui: 
    - [Docker Desktop - documentação](https://docs.docker.com/desktop/)
    - [Docker Desktop - Vídeo-aula](https://www.youtube.com/watch?v=cMyoSkQZ41E)
<hr>
<br>

O NVM é uma ferramenta usada para instalar diferentes versões no Node.js, e do NPM. Já o NPM, é uma ferramenta que ajuda a baixar packages:  <br>
- Pense num programa como um quebra-cabeça 🧩; cada peça é uma instrução do programa; e um package, é como se fosse uma parte já montada deste quebra-cabeça 🖼️, que vamos aproveitar.  <br>
    - Packages então são programas, que tem uma função genérica, e que podem ser reaproveitados em outros programas, e por várias pessoas, evitando retrabalho.

### 2. Instalação do NVM
Este tutorial pode ajudar: [artigo](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)
> Observação: embora o artigo mostre os comandos a se usar no passo a passo para Linux, eles estão apontando para versões mais antigas, por isso, use-o como base enquanto acompanha o passo da documentação oficial:
>   - [Documentação do NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

<br>

## Passo a passo para executar o servidor
Depois que você tiver clonado o repositório, e instalado o Docker e o NVM, siga os passos abaixo:

1. Acesse a pasta do projeto (smm-solutions-dashboard-server);
2. Copie e cole o conteúdo de `env.example` em um novo arquivo chamado `.env`;
3. No arquivo `.env`, substitua os campos indicados com valores de sua escolha, e salve-o;
4. Abra o terminal, dentro de smm-solutions-dashboard-server, e execute o comando `nvm install node`;
5. Execute o comando `npm install`, para baixar os pedaços do quebra-cabeça que o projeto usa;
<hr>

6. **Execute o banco de dados**  

    **Caso você esteja usando Docker Desktop:**  
    - Siga também as instruções da vídeo-aula, a mesma que você usou na instalação, mas neste momento do vídeo: [Docker Desktop - tutorial](https://youtu.be/cMyoSkQZ41E?t=392).  
        - Se atente somente aos passos de como abrir o terminal do Docker Desktop, e então siga os passos abaixo.
        - Lembre-se de que os comandos precisam ser executados dentro da pasta do projeto para funcionarem.

    **Depois que você já estiver com o terminal do Docker aberto:**  
    >  Fazer o servidor do banco de dados funcionar;
    - docker compose up -d
    
    <br>

    > Copiar o arquivo com o código SQL que cria a estrutura inicial do banco de dados para dentro do container;
    - docker cp db-init.sql postgres_db:/tmp/db-init.sql
     
    <br>
    
    > Abrir o terminal do psql, onde é possível, entre outras coisas, executar consultas SQL;
    - sudo docker exec -it postgres_db psql -U `<YOUR_DB_USERNAME>` -d smm_db
     
    <br>
    
    > Executar o código SQL do arquivo db-init.sql, para criar as tabelas do banco de dados;
    - \i /tmp/db-init.sql
     
    <br>
    
    Por fim, execute `\dt` para ver as tabelas que foram criadas.
<hr>

7. Abra um novo terminal (também dentro da pasta do projeto);
8. Execute o comando `npm run devStart`, para executar o servidor;
9. Abra o navegador, e acesse http://localhost:5000;

<br>

Sei que são muitos passos, mas é mesmo só da primeira vez. Depois, só será necessário executar o **banco de dados** e o comando `npm run devStart`.

<br>

## Considerações
- Para interromper a execução do banco de dados, execute `docker compose down`; 
- E, para interromper a execução do servidor do dashboard, pressione `ctrl + c`.