import { useState } from 'react';

export default function Dashboard({ onGerenciar }: any) {
  const [modalAberto, setModalAberto] = useState(false);

  const frota = [
    { id: '1', codigo: 'EMB-195', status: 'Em Montagem', etapa: 'Estrutura Principal' },
    { id: '2', codigo: 'KC-390', status: 'Testes', etapa: 'Teste Hidráulico' },
  ];

  return (
    <div className="space-y-6">
      {/* Cards Superiores */}
      <div className="grid grid-cols-3 gap-6">
        <div className="card-indicador">
          <h3 className="text-slate-500 text-sm font-medium">Aeronaves em Produção</h3>
          <p className="text-3xl font-bold text-slate-800 mt-2">{frota.length}</p>
        </div>
        {/* Outros cards seguem a mesma classe .card-indicador */}
      </div>

      {/* Tabela */}
      <div className="container-branco">
        <div className="p-4 border-b flex justify-between items-center bg-slate-50">
          <h2 className="titulo-secao">Aeronaves Ativas</h2>
          <button onClick={() => setModalAberto(true)} className="btn-primario">
            + Cadastrar Aeronave
          </button>
        </div>
        
        <table className="tabela-app">
          <thead className="tabela-head">
            <tr>
              <th className="p-4">Código</th>
              <th className="p-4">Status</th>
              <th className="p-4">Etapa</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {frota.map((aero) => (
              <tr key={aero.id} className="tabela-linha">
                <td className="p-4 font-medium">{aero.codigo}</td>
                <td className="p-4">
                  <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                    {aero.status}
                  </span>
                </td>
                <td className="p-4">{aero.etapa}</td>
                <td className="p-4 text-right space-x-4">
                  <button onClick={() => onGerenciar(aero)} className="text-blue-600 font-medium">Gerenciar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}