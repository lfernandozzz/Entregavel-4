import { useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle, MessageSquare } from 'lucide-react';

// Componente Filho A: recebe o estado e a função atualizadora do Pai via props
function CampoMensagem({ texto, onAlterarTexto }) {
  return (
    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
      <label
        htmlFor="mensagem-compartilhada"
        className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2"
      >
        Filho A (Emissor de Eventos)
      </label>
      <input
        id="mensagem-compartilhada"
        type="text"
        value={texto}
        onChange={(e) => onAlterarTexto(e.target.value)}
        placeholder="Digite algo para sincronizar com o irmão..."
        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
      />
      <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
        <ArrowUpCircle className="w-3.5 h-3.5 text-indigo-600" />
        Envia o novo valor para cima (<code className="bg-slate-200/70 px-1 rounded">onAlterarTexto</code>)
      </p>
    </div>
  );
}

// Componente Filho B (irmão): recebe o mesmo estado elevado do Pai via props
function EspelhoMensagem({ texto }) {
  return (
    <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 flex flex-col justify-between">
      <div>
        <span className="block text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-2">
          Filho B (Receptor de Dados)
        </span>
        <div className="p-3 rounded-lg bg-white border border-indigo-100 text-sm text-slate-800 min-h-[42px] flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-indigo-500 shrink-0" />
          <span className="break-all">
            {texto.trim() ? texto : <em className="text-slate-400">Aguardando digitação no Filho A...</em>}
          </span>
        </div>
      </div>
      <p className="mt-2 text-xs text-indigo-700/80 flex items-center gap-1">
        <ArrowDownCircle className="w-3.5 h-3.5 text-indigo-600" />
        Recebe o estado atualizado para baixo via prop (<code className="bg-indigo-100 px-1 rounded">texto</code>)
      </p>
    </div>
  );
}

// Componente Pai do exercício guiado: detém o estado elevado (Lifting State Up)
export function LiftingStateGuiado() {
  // Antes esse estado ficava preso apenas dentro do input; agora vive no Pai!
  const [mensagemCompartilhada, setMensagemCompartilhada] = useState('Olá, React!');

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
        <div>
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-full mb-2">
            Parte 1 – Exercício Guiado (Lifting State Up)
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            Compartilhamento de Estado entre Irmãos
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            O estado foi elevado para o componente pai para sincronizar dois componentes irmãos em tempo real.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setMensagemCompartilhada('')}
          className="self-start sm:self-center px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
        >
          Limpar Texto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CampoMensagem
          texto={mensagemCompartilhada}
          onAlterarTexto={setMensagemCompartilhada}
        />
        <EspelhoMensagem texto={mensagemCompartilhada} />
      </div>
    </section>
  );
}
