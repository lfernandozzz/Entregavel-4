import { CheckCircle2, Circle, Trash2, ListTodo } from 'lucide-react';

const CORES_PRIORIDADE = {
  Alta: 'bg-rose-50 text-rose-700 border-rose-200',
  Média: 'bg-amber-50 text-amber-700 border-amber-200',
  Baixa: 'bg-sky-50 text-sky-700 border-sky-200',
};

// Componente Filho 2: recebe o array de tarefas e handlers do Pai (App) via props
export function Lista({ tarefas, onAlternarConclusao, onRemoverTarefa }) {
  const totalPendentes = tarefas.filter((t) => !t.concluida).length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-sky-50 text-sky-700 rounded-full mb-2">
            Filho 2 – Lista.jsx
          </span>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-sky-600" />
            Lista de Tarefas
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
            {totalPendentes} {totalPendentes === 1 ? 'pendente' : 'pendentes'}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            Total: {tarefas.length}
          </span>
        </div>
      </div>

      {tarefas.length === 0 ? (
        <div className="text-center py-10 px-4 border-2 border-dashed border-slate-200 rounded-xl">
          <p className="text-sm font-medium text-slate-500">Nenhuma tarefa cadastrada.</p>
          <p className="text-xs text-slate-400 mt-1">
            Use o formulário ao lado para adicionar sua primeira tarefa.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {tarefas.map((tarefa) => (
            <li
              key={tarefa.id}
              className="py-3.5 flex items-center justify-between gap-3 group"
            >
              <button
                type="button"
                onClick={() => onAlternarConclusao(tarefa.id)}
                className="flex items-center gap-3 text-left flex-1 min-w-0"
              >
                {tarefa.concluida ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 shrink-0 transition" />
                )}

                <span
                  className={`text-sm truncate transition ${
                    tarefa.concluida
                      ? 'line-through text-slate-400'
                      : 'font-medium text-slate-800'
                  }`}
                >
                  {tarefa.titulo}
                </span>
              </button>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                    CORES_PRIORIDADE[tarefa.prioridade] || CORES_PRIORIDADE.Média
                  }`}
                >
                  {tarefa.prioridade}
                </span>

                <button
                  type="button"
                  onClick={() => onRemoverTarefa(tarefa.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Remover tarefa"
                  aria-label={`Remover ${tarefa.titulo}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
