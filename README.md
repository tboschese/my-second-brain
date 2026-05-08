# Segundo Cérebro

Um app de "segundo cérebro" para consultar PDFs, vídeos do YouTube, páginas do Kindle e artigos com IA — respostas conversacionais com citações vivas que apontam para o trecho original.

Composto por duas peças que andam juntas:

1. **Web app** (desktop) — onde você conversa com o seu acervo, navega na biblioteca, estuda com flashcards.
2. **Extensão Chrome** — captura conteúdo de qualquer aba (Kindle Cloud Reader, YouTube, artigos) e empurra para o web app.

> Status: protótipo navegável. UI completa com dados mock; backend (embeddings, vetor store, LLM) ainda não conectado.

---

## Estrutura

```
.
├── index.html                  # entry do web app desktop
├── app-web.jsx                 # app desktop completo (sidebar + 5 telas)
├── data.jsx                    # dados mock compartilhados (livros, citações, flashcards)
│
├── Segundo Cerebro Mobile.html # versão mobile (iPhone) preservada
├── prototype-app.jsx           # app mobile completo
│
└── extension/                  # Chrome extension MV3
    ├── manifest.json
    ├── popup.html / popup.css / popup.js
    ├── background.js           # service worker
    └── content/
        ├── kindle.js           # captura página a página no Kindle Cloud Reader
        ├── youtube.js          # extrai metadata + transcrição
        ├── article.js          # extrai conteúdo principal de qualquer página
        └── webapp-bridge.js    # ponte chrome.storage ↔ web app
```

---

## Rodando o web app

Não tem build — é React + Babel via CDN. Basta servir os arquivos estáticos:

```bash
python3 -m http.server 3000
```

Abra `http://localhost:3000/index.html`.

A versão mobile fica em `http://localhost:3000/Segundo Cerebro Mobile.html`.

---

## Instalando a extensão

1. Abra `chrome://extensions`
2. Ative "Modo do desenvolvedor" (canto superior direito)
3. Clique em **"Carregar sem compactação"** e selecione a pasta `extension/`

A extensão se conecta ao web app rodando em `localhost:3000`. Capturas feitas via popup aparecem em tempo real na aba **Capturado** do app.

### O que cada captura faz

| Tipo | Como funciona |
|---|---|
| **YouTube** | Em `youtube.com/watch`: extrai título, canal, duração, thumbnail. Tenta abrir o painel de transcrição automaticamente e capturar o texto. |
| **Kindle** | Em `read.amazon.com`: captura o texto da página atual. Modo automático observa mudanças no DOM e captura a cada virada de página — útil para percorrer um livro inteiro. |
| **Artigo / página** | Qualquer outra URL: scoring heurístico para encontrar o conteúdo principal (igual Readability). Suporta captura de seleção. |

---

## Sistema visual

- **Estética:** editorial moderno — papel quente, tipografia séria, sensação de biblioteca pessoal.
- **Cores:** base bege `#faf7ef`, tinta quase-preta `#1f1c14`, acento âmbar `#a45c2c`.
- **Fontes:** Newsreader (serif editorial) para corpo e títulos, Inter para UI, JetBrains Mono para metadados.
- **Citações:** numerinhos `[1]` inline → ao clicar abrem painel lateral (desktop) ou bottom sheet (mobile) com o trecho exato + livro + página.

---

## Próximos passos

- Backend: pipeline de embeddings (PDFs, transcrições, artigos) + vetor store + LLM com citações.
- Processamento de capturas pendentes na fila.
- Modo offline / sincronização.
- Ícones da extensão (PNG 16/32/48/128).
