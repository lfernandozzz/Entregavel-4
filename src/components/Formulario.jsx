import { useState } from 'react';
import { PlusCircle, AlertCircle } from 'lucide-react';

// Componente Filho 1: recebe a função de adicionar tarefa do Pai (App) via props
export function Formulario({ onAdicionarTarefa }) {
  const [titulo, setTitulo] = useState('');
  const [prioridade, setPrioridade] = useState('Média');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setErro('Digite a descrição da tarefa antes de adicionar.');
      return;
    }

    // Evento sobe para o componente Pai (App)
    onAdicionarTarefa({
      titulo: titulo.trim(),
      prioridade,
    });

    setTitulo('');
    setPrioridade('Média');
    setErro('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-full mb-2">
        Filho 1 – Formulario.jsx
      </span>
      <h2 className="text-lg font-bold text-slate-800">Nova Tarefa</h2>
      <p className="text-xs text-slate-500 mt-1">
        Recebe <code className="bg-slate-100 px-1 rounded">onAdicionarTarefa</code> via props e envia eventos para o Pai.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
        <div>
          <label htmlFor="titulo-tarefa" className="block text-sm font-medium text-slate-700 mb-1">
            Descrição da Tarefa
          </label>
          <input
            id="titulo-tarefa"
            type="text"
            value={titulo}
            onChange={(e) => {
              setTitulo(e.target.value);
              if (erro) setErro('');
            }}
            placeholder="Ex: Estudar useEffect e Lifting State Up"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${
              erro
                ? 'border-red-500 bg-red-50/40 text-red-900 focus:ring-2 focus:ring-red-200'
                : 'border-slate-300 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
            }`}
          />
          {erro && (
            <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {erro}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="prioridade-tarefa" className="block text-sm font-medium text-slate-700 mb-1">
            Prioridade
          </label>
          <select
            id="prioridade-tarefa"
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition active:scale-[0.99]"
        >
          <PlusCircle className="w-4 h-4" />
          Adicionar Tarefa
        </button>
      </form>
    </div>
  );
}
