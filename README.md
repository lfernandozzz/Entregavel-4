# Gerenciador de Tarefas & Lifting State Up (React + useEffect)

Aplicação desenvolvida em **React** com **Tailwind CSS** para demonstrar o compartilhamento de estado entre componentes (*Lifting State Up*), o fluxo unidirecional de dados e a sincronização com sistemas externos usando o hook `useEffect`.

---

## 📋 Estrutura e Funcionalidades do Projeto

- **Parte 1 – Manipulação e Validação de Dados (`src/components/LiftingStateGuiado.jsx`):**
  - Demonstração prática de **Lifting State Up**: o estado `mensagemCompartilhada` foi elevado para o componente pai e repassado via `props` para dois componentes irmãos (`CampoMensagem` e `EspelhoMensagem`), permitindo que ambos permaneçam sincronizados.
- **Parte 2 – Mini Projeto: Gerenciador de Tarefas (`App.jsx`, `Formulario.jsx`, `Lista.jsx`):**
  - **Componente Pai (`App.jsx`):** concentra a fonte única da verdade (`const [tarefas, setTarefas] = useState(...)`) e utiliza `useEffect` para atualizar `document.title` com a quantidade de tarefas pendentes (ex.: `"2 tarefas pendentes"`).
  - **Componente Filho 1 (`Formulario.jsx`):** recebe a função `onAdicionarTarefa` via `props` e dispara eventos para cima ao submeter novas tarefas.
  - **Componente Filho 2 (`Lista.jsx`):** recebe o array `tarefas` via `props` e exibe os itens, permitindo marcar como concluído ou remover.
- **Parte 3 – Tarefa de Casa / Desafio (`src/components/TimerSessao.jsx`):**
  - Implementa um contador de tempo de permanência na página utilizando `useEffect` com `setInterval` e função de limpeza (`clearInterval`) no `return` para evitar vazamentos de memória (*memory leaks*).

---

## 🤔 Parte 4 – Reflexão (Para Pensar)

### 1. O que acontece se omitirmos o array de dependências do `useEffect`?

Quando omitimos o segundo argumento (o array de dependências) de um `useEffect`:

```jsx
useEffect(() => {
  // Este código executará após TODA renderização do componente!
});
```

- **Execução a cada renderização:** O efeito passa a rodar na montagem inicial **e** após absolutamente toda e qualquer atualização de estado ou prop do componente, mesmo que os dados usados dentro do efeito não tenham mudado.
- **Risco de Loop Infinito:** Se dentro desse `useEffect` sem array de dependências houver uma chamada que atualiza algum estado (`setState`), o componente entrará em um **loop infinito de re-renderizações** (renderiza &rarr; roda o efeito &rarr; atualiza o estado &rarr; renderiza novamente &rarr; roda o efeito...), travando a aplicação.
- **Perda de performance e efeitos duplicados:** Requisições de rede, manipulação desnecessária do DOM ou criação de novos timers/listeners acontecerão repetidamente a cada ciclo de renderização.

---

### 2. Como funciona o fluxo de dados no *Lifting State Up*?

O React segue o princípio do **fluxo de dados unidirecional** (*One-Way Data Flow*), frequentemente resumido como **"dados para baixo, eventos para cima"**:

1. **Elevação do Estado (Fonte Única da Verdade):** Quando dois ou mais componentes irmãos precisam compartilhar ou reagir ao mesmo dado, removemos o estado local de dentro dos filhos e o movemos para o **ancestral comum mais próximo** (o componente Pai).
2. **Dados para baixo (`Props`):** O componente Pai passa o valor atual do estado para os componentes Filhos através de `props` (ex.: `<Lista tarefas={tarefas} />`). Os filhos apenas leem e exibem esses dados.
3. **Eventos para cima (`Callbacks`):** Como componentes filhos não podem alterar diretamente as `props` que recebem, o Pai também passa funções atualizadoras via `props` (ex.: `<Formulario onAdicionarTarefa={adicionarTarefa} />`). Quando ocorre uma ação do usuário no Filho (como clicar em "Adicionar"), o Filho invoca essa função de *callback*, notificando o Pai.
4. **Atualização e Sincronização:** O Pai atualiza seu próprio estado via `setState`, re-renderiza a si mesmo e envia os novos dados atualizados para baixo novamente, mantendo toda a árvore de componentes sincronizada.

---

