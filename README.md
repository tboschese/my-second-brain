# Segundo Cérebro

Um app de "segundo cérebro" para consultar PDFs, vídeos do YouTube, episódios de podcast e artigos com IA — respostas conversacionais com citações vivas que apontam para o trecho original.

Composto por duas peças que andam juntas:

1. **Web app** — onde você conversa com o seu acervo, navega na biblioteca, estuda com flashcards. Livros entram aqui via upload de PDF.
2. **Extensão Chrome** — captura **vídeos do YouTube**, **episódios de podcast** (Spotify, Apple Podcasts, Overcast, Pocket Casts, Castro) e **artigos** de qualquer página, empurrando tudo para o web app.

> **Status:** UI completa, **sem mocks**. Tudo que aparece é dado real — armazenado em `localStorage` (livros, destaques, conversas, flashcards) ou em `chrome.storage` (capturas vindas da extensão). O backend de extração de PDF + embeddings + LLM ainda não está conectado: por enquanto o chat salva suas perguntas no histórico e responde com um aviso explicando isso.

---

## Estrutura

```
.
├── index.html          # entry do web app
├── app-web.jsx         # app completo (sidebar + 5 telas + modais)
├── data.jsx            # store localStorage + hook useStore()
│
└── extension/          # Chrome extension MV3
    ├── manifest.json
    ├── popup.html / popup.css / popup.js
    ├── background.js   # service worker
    └── content/
        ├── youtube.js         # extrai metadata + transcrição
        ├── podcast.js         # extrai metadata de Spotify, Apple Podcasts, Overcast…
        ├── article.js         # extrai conteúdo principal de qualquer página
        └── webapp-bridge.js   # ponte chrome.storage ↔ web app
```

---

## Rodando o web app

Não tem build — é React + Babel via CDN. Basta servir os arquivos estáticos:

```bash
python3 -m http.server 3000
# abre http://localhost:3000/index.html
```

Na primeira abertura tudo fica vazio:

- **Conversar** → "Comece a construir seu segundo cérebro"
- **Biblioteca** → "Sua biblioteca está vazia · Adicionar primeiro livro"
- **Estudo** → "Nenhum flashcard ainda"
- **Histórico** → "Sem conversas ainda"
- **Capturado** → "Nenhum item capturado ainda"

Adicione um PDF pela Biblioteca (extraímos nome do arquivo + número de páginas; você completa título e autor) ou capture algo via extensão.

---

## Instalando a extensão

1. Abra `chrome://extensions`
2. Ative "Modo do desenvolvedor"
3. Clique em **"Carregar sem compactação"** e selecione a pasta `extension/`

A extensão escreve capturas em `chrome.storage.local`. Quando o web app está aberto em `localhost:3000`, o `webapp-bridge.js` é injetado e re-emite as capturas como eventos `sc-captures` no `window` — o app escuta e renderiza em tempo real na aba **Capturado**.

### O que cada captura faz

| Tipo | Como funciona |
|---|---|
| **YouTube** | Em `youtube.com/watch`: extrai título, canal, duração, thumbnail. Tenta abrir o painel de transcrição automaticamente e capturar o texto. |
| **Podcast** | Em `open.spotify.com/episode`, `podcasts.apple.com`, Overcast, Pocket Casts, Castro: extrai título do episódio, nome do show, duração e descrição/notas via OpenGraph e JSON-LD. |
| **Artigo / página** | Qualquer outra URL: scoring heurístico para encontrar o conteúdo principal (estilo Readability). Suporta captura de seleção. |

> **Livros** entram pelo web app via upload de PDF — não pela extensão.

Da aba **Capturado** você pode "Adicionar" um item à biblioteca (vira um livro com a fonte/autor da captura) ou "Ignorar" (remove de `chrome.storage`).

---

## Sistema visual

- **Estética:** editorial moderno — papel quente, tipografia séria, sensação de biblioteca pessoal.
- **Cores:** base bege `#faf7ef`, tinta quase-preta `#1f1c14`, acento âmbar `#a45c2c`.
- **Fontes:** Newsreader (serif editorial) para corpo e títulos, Inter para UI, JetBrains Mono para metadados.

Cada livro recebe uma cor de capa do palette em `data.jsx` (round-robin), então toda lombada fica distinta sem precisar pedir nada ao usuário.

---

## Próximos passos

- **Backend.** Pipeline de extração (PDF → texto → chunks → embeddings) + vetor store + LLM. O chat hoje grava a pergunta no histórico e devolve um aviso de "backend não conectado" — pronto para reprocessar quando estiver online.
- **Citações vivas.** Quando o backend voltar respostas com referências, renderizar `[1]` inline e abrir o painel lateral com o trecho exato (componente `CitationPanel` já estava modelado).
- **Geração de flashcards** a partir de uma resposta no chat (botão "Salvar como flashcard").
- **Ícones da extensão** (PNG 16/32/48/128).
