import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

// Parte 3 – Tarefa de Casa (Desafio): useEffect com setInterval + cleanup no return
export function TimerSessao() {
  const [segundosAbertos, setSegundosAbertos] = useState(0);

  useEffect(() => {
    // Inicia o intervalo que incrementa o contador a cada 1 segundo (1000 ms)
    const intervalId = setInterval(() => {
      setSegundosAbertos((segundosAtuais) => segundosAtuais + 1);
    }, 1000);

    // Função de limpeza (cleanup): executada quando o componente é desmontado
    // Evita vazamentos de memória (memory leaks) e timers duplicados
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Array de dependências vazio: roda apenas uma vez na montagem

  const formatarTempo = (totalSegundos) => {
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
  };

  return (
    <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white shadow-sm">
      <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
      <div className="text-xs">
        <span className="text-slate-400 mr-1.5">Página aberta há:</span>
        <span className="font-mono font-bold text-sm text-emerald-300 tabular-nums">
          {formatarTempo(segundosAbertos)}
        </span>
      </div>
    </div>
  );
}
