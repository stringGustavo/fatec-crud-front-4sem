# Criação de um CRUD de usuários

Este repositório tem como objetivo ensinar, passo a passo, a criação de um CRUD básico, que contenha as 4 operações básicas de manipulação de dados:

**C —** ```Create``` (Criar): adicionar novos dados.

**R —** ```Read``` (Ler): consultar ou visualizar dados já existentes.

**U —** ```Update``` (Atualizar): modificar dados já existentes.

**D —** ```Delete``` (Excluir): apagar dados do sistema.

### Acesse aqui o [Repositório do BackEnd](https://github.com/stringGustavo/fatec-crud-api-4sem)
<br>

## Criando o Projeto e Instalando Depenências

#### Primeiramente, vamos criar o projeto React + Vite.
```bash
npm create vite@latest
```

#### Instalando React Icons e Axios.
```
npm install react-icons --save
npm install axios
```

Neste projeto foi utilizado o *framework* TailwindCSS para a estilização dos componentes.

#### Instalando o TailwindCSS.
```
npm install tailwindcss @tailwindcss/vite
```
Após a instalação, adicione o plugin do TailwindCSS no arquivo ```vite.config.js```.
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

```

Pra finalizar com o TailwindCSS, adicione o código abaixo no arquivo ```index.css```
```css
@import "tailwindcss";
```
Para certificar que tudo está instalado abra o arquivo ```package.json``` e verifique se as dependências estão da seguinte forma abaixo.
```json
  "dependencies": {
    "@tailwindcss/vite": "^4.1.7",
    "axios": "^1.9.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-icons": "^5.5.0",
    "tailwindcss": "^4.1.7"
  },
```

</br>

Agora que tudo está instalado, podemos começar a desenvolver o nosso FrontEnd.

## Criando a página principal

Antes de editar o ```App.jsx```, crie a pasta ```componentes``` e dentro dela crie os seguintes componentes:

```Form.jsx ``` Será o componente responsável por lidar com o preenchimento do formulário de cadastro de usuário.

```Content.jsx``` Será o componente criado para visualizar as informações dos usuários cadastrados pelo formulário.

No arquivo ```App.jsx```, comece com as importações necessárias.
```js
import Form from './components/Form' // Importação do componente Form.jsx
import Content from './components/Content' // Importação do componente Content.jsx
import { useState } from 'react'; // Importação do hook useState
```

Como neste projeto teremos estados que precisam ser alterados em ambos componentes filhos (Content e Form), todos os estados precisam ficar no componete pai, já que só é possível enviar ```props``` da componente ```Pai``` para componente ```Filho```.

```js
const App = () => {
  const [updateTrigger, setUpdateTrigger] = useState(false); // Responsável por ativar ou desativar a função de atualizar um usuário.
  const [isChanged, setIsChanged] = useState(false); // Responsável por detectar se os dados mudaram (algo foi adicionado, deletado ou atualizado)
  const [formData, setFormData] = useState({ // Objeto responsável por armazenar informações do usuário (em Content.jsx) que será atualizado (em Form.jsx).
    id: '',
    name: '',
    email: '',
    birth: '',
    register: '',
  });

  return (
    <div className='flex flex-col items-center h-full bg-gray-900'>
      <Form // Passando os props que serão alteravéis no componente Form.jsx.
        setIsChanged={setIsChanged}
        updateTrigger={updateTrigger}
        setUpdateTrigger={setUpdateTrigger}
        formData={formData}
        setFormData={setFormData}
      />
      <Content // Passando os props que serão alteravéis no componente Content.jsx.
        isChanged={isChanged}
        setFormData={setFormData}
        setUpdateTrigger={setUpdateTrigger}
      />
    </div>
  )
}

export default App;
```

