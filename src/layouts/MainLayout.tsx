import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  telaAtiva: string;
  setTelaAtiva: (tela: string) => void;
  titulo: string;
}

export default function MainLayout({ children, telaAtiva, setTelaAtiva, titulo }: Props) {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="sidebar-container">
        <div className="p-6 text-2xl font-bold border-b border-slate-700">✈️ Aerocode</div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setTelaAtiva('dashboard')}
            className={`btn-nav ${telaAtiva === 'dashboard' || telaAtiva === 'detalhes' ? 'bg-blue-600' : ''}`}
          >
            Dashboard (Frota)
          </button>
          <button 
            onClick={() => setTelaAtiva('admin')}
            className={`btn-nav ${telaAtiva === 'admin' ? 'bg-blue-600' : ''}`}
          >
            Painel Administrativo
          </button>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button onClick={() => setTelaAtiva('login')} className="w-full text-left p-3 text-red-400 hover:bg-slate-800 rounded transition-colors">
            Sair do Sistema
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="header-app">
          <h1 className="text-xl font-semibold text-slate-800">{titulo}</h1>
          <div className="text-sm font-medium text-slate-600">Engenheiro: Admin</div>
        </header>
        <div className="p-6 flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}