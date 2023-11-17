 # Dio Music - Web App de Busca por Músicas pelo seu título, Artista ou trecho.

Este é um projeto que combina APIs do Google Custom Search, Vagalume e YouTube para buscar informações sobre músicas e exibir suas letras. Ele utiliza HTML, CSS e JavaScript para criar uma interface simples e interativa.

## Funcionalidades

- **Busca de Músicas:** Digite o nome da música, partes da letra ou nome do artista na barra de pesquisa para encontrar informações sobre a música desejada.
- **Listagem de Resultados:** Apresenta uma lista de músicas correspondentes à pesquisa, mostrando título e artista.
- **Visualização de Letras:** Ao clicar no ícone na listagem de resultado, é exibido o video e a letra da música selecionada.
- **Reprodução do Vídeo no YouTube:** Possibilita ouvir a música buscada no YouTube.

## Como Usar

### 1. **Obtenção das Chaves das APIs:**

   - **Google Custom Search:** Para a API de busca do Google, é necessário obter uma chave de API e uma ID de pesquisa customizada (CX). Visite [este link](https://developers.google.com/custom-search/v1/introduction?hl=pt-br#identify_your_application_to_google_with_api_key) para mais detalhes sobre como obter essas chaves.
   
     Selecione mecanismo de busca programável.
     
     ![image](https://github.com/IgorAuguusto/Dio-Music/assets/82172424/0e56401f-fa57-4523-86ac-c35ab3ae2ac2)
   
   
     Em sites para pesquisar adicione somente `www.vagalume.com.br/*`
   
     ![image](https://github.com/IgorAuguusto/Dio-Music/assets/82172424/17bea484-49c4-429e-862d-71049092e8e4)
   
   
      - **Vagalume:** A API do Vagalume requer uma chave de API. Acesse [este link](https://api.vagalume.com.br/docs/letras/) para mais informações sobre como conseguir a chave.



### 2. **Configuração das Chaves de API:**

- Na pasta `js`, crie um arquivo js com o seguinte nome: `apikeys.js` dentro dele crie as constantes  `API_KEY_GOOGLE_SEARCH`, `CX` e `API_KEY_VAGALUME`.

  ![image](https://github.com/IgorAuguusto/Dio-Music/assets/82172424/d9eb0da8-0bfe-4cb5-9bb8-7345e1822a2c)

- Exatamente como mostrado na imagem abaixo. Em `YOUR_API_KEY` coloque suas chaves e cx correspondentes.

    ![image](https://github.com/IgorAuguusto/Dio-Music/assets/82172424/a6374b03-689b-4624-ba21-407ce2c77d73)


### 3. **Execução do Web App:**

   - Abra o arquivo `index.html` em um navegador web.

### 4. **Utilização do Dio Music:**

   - Digite o nome da música ou do artista na barra de pesquisa e pressione Enter ou clique no botão de busca.

      ![image](https://github.com/IgorAuguusto/Dio-Music/assets/82172424/8e81fc9b-23ef-45b4-b712-ff67adedd504)


   - A lista de músicas correspondentes será exibida.

      No exemplo abaixo é exibido o resultado da pesquisa para a banda Metallica.
    
     ![image](https://github.com/IgorAuguusto/Dio-Music/assets/82172424/dc830a82-4a26-4e80-8430-094ada9a7b75)


   - Clique no `botão na listagem em amarelo` ao lado da música desejada para ver a letra e ouvir a música no YouTube.

     ![image](https://github.com/IgorAuguusto/Dio-Music/assets/82172424/f3a1bed5-5d27-4efc-baec-1fd1ab071a1f)



     Com isso será exibido o vídeo e a letra da música  conforme o exemplo abaixo.

     ![image](https://github.com/IgorAuguusto/Dio-Music/assets/82172424/3645a78f-432c-411a-ab57-969de265cae4)

## Observações

Certifique-se de criar o arquivo apikeys.js e suas constantes.
