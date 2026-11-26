import { useState, useEffect } from 'react';
import { LiftingStateGuiado } from './components/LiftingStateGuiado';
import { Formulario } from './components/Formulario';
import { Lista } from './components/Lista';
import { TimerSessao } from './components/TimerSessao';

const TAREFAS_INICIAIS = [
  { id: 1, titulo: 'Revisar fluxo de dados (props para baixo, eventos para cima)', prioridade: 'Alta', concluida: true },
  { id: 2, titulo: 'Implementar useEffect para atualizar título da aba', prioridade: 'Alta', concluida: false },
  { id: 3, titulo: 'Adicionar cleanup no setInterval do timer', prioridade: 'Média', concluida: false },
];

export function App() {
  // Parte 2: Estado compartilhado elevado para o Componente Pai (App)
  const [tarefas, setTarefas] = useState(TAREFAS_INICIAIS);

  // Parte 2: Efeito colateral para sincronizar o título da aba do navegador com as tarefas pendentes
  useEffect(() => {
    const pendentes = tarefas.filter((tarefa) => !tarefa.concluida).length;

    if (pendentes === 0) {
      document.title = 'Nenhuma tarefa pendente!';
    } else if (pendentes === 1) {
      document.title = '1 tarefa pendente';
    } else {
      document.title = `${pendentes} tarefas pendentes`;
    }
  }, [tarefas]); // Roda sempre que o array 'tarefas' for alterado

  // Função passada para o Filho 1 (Formulario)
  const adicionarTarefa = ({ titulo, prioridade }) => {
    const novaTarefa = {
      id: Date.now(),
      titulo,
      prioridade,
      concluida: false,
    };
    setTarefas((prevTarefas) => [novaTarefa, ...prevTarefas]);
  };

  // Funções passadas para o Filho 2 (Lista)
  const alternarConclusaoTarefa = (id) => {
    setTarefas((prevTarefas) =>
      prevTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  const removerTarefa = (id) => {
    setTarefas((prevTarefas) => prevTarefas.filter((tarefa) => tarefa.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Cabeçalho com o Timer da Parte 3 */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Lifting State Up &amp; useEffect
            </h1>
            <p className="text-sm text-slate-500">
              Comunicação entre componentes React e sincronização com efeitos colaterais
            </p>
          </div>

          {/* Parte 3: Timer de sessão com setInterval + cleanup */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Parte 3 (Desafio):
            </span>
            <TimerSessao />
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Parte 1: Exercício Guiado */}
        <LiftingStateGuiado />

        {/* Parte 2: Mini Projeto (Gerenciador de Tarefas com Pai + Filho 1 + Filho 2) */}
        <section className="space-y-4">
          <div>
            <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-full mb-1">
              Parte 2 – Mini Projeto (Gerenciador de Tarefas)
            </span>
            <h2 className="text-xl font-bold text-slate-800">
              Estado no Pai (<code className="text-base bg-slate-200/70 px-1.5 py-0.5 rounded">App</code>) &rarr; Props para os Filhos
            </h2>
            <p className="text-sm text-slate-500">
              Observe o título da aba do navegador mudar automaticamente conforme o número de tarefas pendentes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Filho 1: recebe a função via props */}
            <div className="lg:col-span-5">
              <Formulario onAdicionarTarefa={adicionarTarefa} />
            </div>

            {/* Filho 2: recebe o array de tarefas via props */}
            <div className="lg:col-span-7">
              <Lista
                tarefas={tarefas}
                onAlternarConclusao={alternarConclusaoTarefa}
                onRemoverTarefa={removerTarefa}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        Atividade Prática React: Dados para baixo (props), eventos para cima (callbacks) e efeitos colaterais (useEffect).
      </footer>
    </div>
  );
}

export default App;
