import { useState } from 'react';

export default function Admin() {
  const [modalUser, setModalUser] = useState(false);

  const funcionarios = [
    { id: 1, usuario: 'admin', nivel: 'Administrador' },
    { id: 2, usuario: 'eng.joao', nivel: 'Comum' }
  ];

  return (
    <div className="container-branco">
      <div className="p-4 border-b flex justify-between items-center bg-slate-50">
        <h2 className="titulo-secao">
          Funcionários Cadastrados <span className="text-sm font-normal text-slate-500 ml-2">({funcionarios.length} total)</span>
        </h2>
        <button onClick={() => setModalUser(true)} className="btn-primario">
          + Novo Funcionário
        </button>
      </div>
      <table className="tabela-app">
        <thead className="tabela-head">
          <tr>
            <th className="p-4">Usuário</th>
            <th className="p-4">Nível de Permissão</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((func) => (
            <tr key={func.id} className="tabela-linha">
              <td className="p-4 font-medium">{func.usuario}</td>
              <td className="p-4">{func.nivel}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="font-bold mb-4">Cadastrar Acesso</h2>
            <input type="text" className="input-app mb-2" placeholder="Nome de Usuário" />
            <input type="password" className="input-app mb-4" placeholder="Senha Temporária" />
            <select className="input-app mb-4">
              <option>Nível Comum</option>
              <option>Administrador</option>
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setModalUser(false)} className="btn-secundario">Cancelar</button>
              <button onClick={() => setModalUser(false)} className="btn-primario">Criar Acesso</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}