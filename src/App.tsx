import { useState } from 'react';

// Tipos simulados
interface Aeronave {
  id: string;
  codigo: string;
  status: string;
  etapa: string;
}

export default function App() {
  const [telaAtiva, setTelaAtiva] = useState('login'); // Começa no Login
  const [aeronaveSelecionada, setAeronaveSelecionada] = useState<Aeronave | null>(null);

  const abrirDetalhes = (aeronave: Aeronave) => {
    setAeronaveSelecionada(aeronave);
    setTelaAtiva('detalhes');
  };

  // Se for a tela de login, não mostra os menus laterais
  if (telaAtiva === 'login') {
    return <TelaLogin onLogin={() => setTelaAtiva('dashboard')} />;
  }

  // Layout Principal (Para as outras telas)
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar - Navegação Global */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-slate-700 flex items-center gap-2">
          ✈️ Aerocode
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setTelaAtiva('dashboard')}
            className={`w-full text-left p-3 rounded hover:bg-slate-800 transition-colors ${telaAtiva === 'dashboard' || telaAtiva === 'detalhes' ? 'bg-blue-600' : ''}`}
          >
            Dashboard (Frota)
          </button>
          <button 
            onClick={() => setTelaAtiva('admin')}
            className={`w-full text-left p-3 rounded hover:bg-slate-800 transition-colors ${telaAtiva === 'admin' ? 'bg-blue-600' : ''}`}
          >
            Painel Administrativo
          </button>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button 
            onClick={() => setTelaAtiva('login')}
            className="w-full text-left p-3 text-red-400 hover:bg-slate-800 rounded transition-colors"
          >
            Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Área de Conteúdo Principal */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center z-10">
          <h1 className="text-xl font-semibold text-slate-800">
            {telaAtiva === 'dashboard' && 'Visão Geral da Frota'}
            {telaAtiva === 'detalhes' && `Gerenciando Produção: ${aeronaveSelecionada?.codigo}`}
            {telaAtiva === 'admin' && 'Gestão de Funcionários'}
          </h1>
          <div className="text-sm font-medium text-slate-600">
            Engenheiro Logado: Admin
          </div>
        </header>

        <div className="p-6 flex-1 overflow-auto">
          {telaAtiva === 'dashboard' && <DashboardFrota onGerenciar={abrirDetalhes} />}
          {telaAtiva === 'detalhes' && aeronaveSelecionada && <DetalhesAeronave aeronave={aeronaveSelecionada} onVoltar={() => setTelaAtiva('dashboard')} />}
          {telaAtiva === 'admin' && <PainelAdmin />}
        </div>
      </main>
    </div>
  );
}

// -----------------------------------------------------------------
// TELA 1: LOGIN
// -----------------------------------------------------------------
function TelaLogin({ onLogin }: any) {
  return (
    <div className="h-screen w-full bg-slate-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">✈️ Aerocode</h1>
          <p className="text-slate-500 mt-2 text-sm">Gestão de Produção Aeroespacial</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Usuário</label>
            <input type="text" defaultValue="admin" className="w-full border border-gray-300 rounded p-2 focus:border-blue-500" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <input type="password" defaultValue="admin123" className="w-full border border-gray-300 rounded p-2 focus:border-blue-500" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition-colors">
            Entrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// TELA 2: DASHBOARD
// -----------------------------------------------------------------
function DashboardFrota({ onGerenciar }: any) {
  const [modalAberto, setModalAberto] = useState(false);

  // Lista real que alimenta a tabela
  const frota = [
    { id: '1', codigo: 'EMB-195', status: 'Em Montagem', etapa: 'Estrutura Principal' },
    { id: '2', codigo: 'KC-390', status: 'Testes', etapa: 'Teste Hidráulico' },
  ];

  // Cálculos dinâmicos baseados na lista acima
  const totalProducao = frota.length;
  const testesPendentes = frota.filter(a => a.status === 'Testes').length;
  const concluidas = frota.filter(a => a.status === 'Concluída').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-slate-500 text-sm font-medium">Aeronaves em Produção</h3>
          <p className="text-3xl font-bold text-slate-800 mt-2">{totalProducao}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-slate-500 text-sm font-medium">Testes Pendentes</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{testesPendentes}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-slate-500 text-sm font-medium">Concluídas este Mês</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{concluidas}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-800">Aeronaves Ativas</h2>
          <button onClick={() => setModalAberto(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Cadastrar Aeronave
          </button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-200 text-slate-500 text-sm">
              <th className="p-4 font-medium">Código</th>
              <th className="p-4 font-medium">Status Atual</th>
              <th className="p-4 font-medium">Etapa de Produção</th>
              <th className="p-4 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {frota.map((aeronave) => (
              <tr key={aeronave.id} className="border-b border-gray-100 hover:bg-slate-50">
                <td className="p-4 font-medium">{aeronave.codigo}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${aeronave.status === 'Testes' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                    {aeronave.status}
                  </span>
                </td>
                <td className="p-4">{aeronave.etapa}</td>
                <td className="p-4 text-right space-x-4">
                  <button onClick={() => onGerenciar(aeronave)} className="text-blue-600 hover:text-blue-800 font-medium text-sm">Gerenciar</button>
                  <button className="text-gray-400 text-sm">Relatório</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Novo Cadastro (Visual) */}
      {modalAberto && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Cadastrar Nova Aeronave</h2>
            <input type="text" className="w-full border p-2 mb-4 rounded" placeholder="Ex: BOE-777" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setModalAberto(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded">Cancelar</button>
              <button onClick={() => setModalAberto(false)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Salvar Aeronave</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------
// TELA 3: DETALHES (Com Modais)
// -----------------------------------------------------------------
function DetalhesAeronave({ aeronave, onVoltar }: any) {
  const [modalPeca, setModalPeca] = useState(false);
  const [modalTeste, setModalTeste] = useState(false);

  return (
    <div className="space-y-6">
      <button onClick={onVoltar} className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1">
        &larr; Voltar ao Dashboard
      </button>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Peças Vinculadas</h3>
          <ul className="mb-4 text-sm text-slate-600 space-y-2">
            <li className="border-b pb-2">Turbina GE90 (Importada)</li>
            <li className="border-b pb-2">Trem de Pouso (Nacional)</li>
          </ul>
          <button onClick={() => setModalPeca(true)} className="bg-slate-100 text-slate-700 px-4 py-2 rounded w-full hover:bg-slate-200">
            + Adicionar Peça
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Controle de Produção</h3>
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-500">Etapa Atual</p>
            <p className="text-xl font-bold text-blue-700">{aeronave.etapa}</p>
          </div>
          <div className="space-y-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">Avançar Etapa de Produção</button>
            <button onClick={() => setModalTeste(true)} className="bg-yellow-500 text-white px-4 py-2 rounded w-full hover:bg-yellow-600">Realizar Teste de Qualidade</button>
          </div>
        </div>
      </div>

      {/* Modal Adicionar Peça */}
      {modalPeca && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="font-bold mb-4">Adicionar Peça</h2>
            <select className="w-full border p-2 mb-2 rounded">
              <option>Nacional</option>
              <option>Importada</option>
            </select>
            <input type="text" className="w-full border p-2 mb-4 rounded" placeholder="Nome da peça" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setModalPeca(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100">Cancelar</button>
              <button onClick={() => setModalPeca(false)} className="px-4 py-2 bg-blue-600 text-white rounded">Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Teste */}
      {modalTeste && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="font-bold mb-4">Registrar Teste</h2>
            <select className="w-full border p-2 mb-4 rounded">
              <option>Elétrico</option>
              <option>Hidráulico</option>
              <option>Aerodinâmico</option>
            </select>
            <div className="flex gap-4 mb-4">
              <label><input type="radio" name="status" className="mr-2"/>Aprovado</label>
              <label><input type="radio" name="status" className="mr-2"/>Reprovado</label>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setModalTeste(false)} className="px-4 py-2 text-slate-600">Cancelar</button>
              <button onClick={() => setModalTeste(false)} className="px-4 py-2 bg-blue-600 text-white rounded">Salvar Teste</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------
// TELA 4: ADMIN
// -----------------------------------------------------------------
function PainelAdmin() {
  const [modalUser, setModalUser] = useState(false);

  // Lista real de funcionários
  const funcionarios = [
    { id: 1, usuario: 'admin', nivel: 'Administrador' },
    { id: 2, usuario: 'eng.joao', nivel: 'Comum' }
  ];

  const totalFuncionarios = funcionarios.length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-slate-50">
        <h2 className="text-lg font-semibold text-slate-800">
          Funcionários Cadastrados <span className="text-sm font-normal text-slate-500 ml-2">({totalFuncionarios} total)</span>
        </h2>
        <button onClick={() => setModalUser(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Novo Funcionário
        </button>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white border-b text-slate-500 text-sm">
            <th className="p-4">Usuário</th>
            <th className="p-4">Nível de Permissão</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((func) => (
            <tr key={func.id} className="border-b hover:bg-slate-50">
              <td className="p-4 font-medium">{func.usuario}</td>
              <td className="p-4">{func.nivel}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Novo Funcionário (Sem email) */}
      {modalUser && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="font-bold mb-4">Cadastrar Acesso</h2>
            <input type="text" className="w-full border p-2 mb-2 rounded" placeholder="Nome de Usuário" />
            <input type="password" className="w-full border p-2 mb-4 rounded" placeholder="Senha Temporária" />
            <select className="w-full border p-2 mb-4 rounded">
              <option>Nível Comum</option>
              <option>Administrador</option>
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setModalUser(false)} className="px-4 py-2 text-slate-600">Cancelar</button>
              <button onClick={() => setModalUser(false)} className="px-4 py-2 bg-blue-600 text-white rounded">Criar Acesso</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}