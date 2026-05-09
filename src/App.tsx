import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Detalhes from './pages/Detalhes';
import Admin from './pages/Admin';
import MainLayout from './layouts/MainLayout';

export default function App() {
  const [telaAtiva, setTelaAtiva] = useState('login');
  const [aeronaveSelecionada, setAeronaveSelecionada] = useState<any>(null);

  if (telaAtiva === 'login') return <Login onLogin={() => setTelaAtiva('dashboard')} />;

  const getTitulo = () => {
    if (telaAtiva === 'dashboard') return 'Visão Geral da Frota';
    if (telaAtiva === 'detalhes') return `Gerenciando: ${aeronaveSelecionada?.codigo}`;
    if (telaAtiva === 'admin') return 'Painel Administrativo';
    return '';
  };

  return (
    <MainLayout telaAtiva={telaAtiva} setTelaAtiva={setTelaAtiva} titulo={getTitulo()}>
      {telaAtiva === 'dashboard' && <Dashboard onGerenciar={(a: any) => { setAeronaveSelecionada(a); setTelaAtiva('detalhes'); }} />}
      {telaAtiva === 'detalhes' && <Detalhes aeronave={aeronaveSelecionada} onVoltar={() => setTelaAtiva('dashboard')} />}
      {telaAtiva === 'admin' && <Admin />}
    </MainLayout>
  );
}