## 🔖 Projeto

Este projeto foi criado para um teste de seleção para vaga de Desenvolvedor Full Stack JavaScript Pleno oferecido pela Cooperplace em Curitiba. Onde deveria ser criado um modelo de marketplace de roupas utilizando ReactJS, CSS e Bootstrap, a partir de um dado arquivo JSON que seria utilizado como consulta para listar os items da loja.

### Requisitos

- Na listagem, devem aparecer as informações de nome do produto, preço e a imagem.
- Ao clicar no produto, um modal com os detalhes dever aparecer.
- Crie uma navbar com algumas opções
- Crie um filtro por categoria do produto
- A interface (disposição dos elementos, cores, botões), fica como escolha do desenvolvedor.
- Adicione elementos extras se quiser!
- O uso de bibliotecas é livre! Apenas se atente que o React.js, CSS e Bootstrap são obrigatórios.
- EXTRA: Eu criei o carrinho de compras, onde o usuário consegue inserir os itens no carrinho e remover de acordo com a preferência. É possível escolher o tamanho do item, quando disponível, antes de adicionar ao carrinho.

## 🚀 Tecnologias

O projeto foi criado com o framework [Next.js](https://nextjs.org/) inicializado com [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- ReactJS
- Typescript
- Context API
- Bootstrap
- CSS
- Phosphor icons
- React Toastify
- Axios
- uuid

## 💻 Executando o projeto

Deverá ser criado o arquivo .env.local na raiz do projeto e inserir o valor da variável de ambiente que será utilizada para acesso à API do projeto:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

após este passo, instale as dependências do projeto e depois rode o servidor:

```bash
# executando o projeto usando npm
npm install
npm run dev

# ou usando yarn
yarn 
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado.