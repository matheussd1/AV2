import { useState } from 'react';

export default function Detalhes({ aeronave, onVoltar }: any) {
  const [modalPeca, setModalPeca] = useState(false);
  const [modalTeste, setModalTeste] = useState(false);

  return (
    <div className="space-y-6">
      <button onClick={onVoltar} className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1">
        &larr; Voltar ao Dashboard
      </button>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="container-branco p-6">
          <h3 className="titulo-secao mb-4">Peças Vinculadas</h3>
          <ul className="mb-4 text-sm text-slate-600 space-y-2">
            <li className="border-b pb-2">Turbina GE90 (Importada)</li>
            <li className="border-b pb-2">Trem de Pouso (Nacional)</li>
          </ul>
          <button onClick={() => setModalPeca(true)} className="btn-secundario w-full">
            + Adicionar Peça
          </button>
        </div>

        <div className="container-branco p-6">
          <h3 className="titulo-secao mb-4">Controle de Produção</h3>
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-500">Etapa Atual</p>
            <p className="text-xl font-bold text-blue-700">{aeronave.etapa}</p>
          </div>
          <div className="space-y-3">
            <button className="btn-primario w-full">Avançar Etapa</button>
            <button onClick={() => setModalTeste(true)} className="btn-alerta w-full">Realizar Teste</button>
          </div>
        </div>
      </div>

      {modalPeca && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="font-bold mb-4">Adicionar Peça</h2>
            <select className="input-app mb-2"><option>Nacional</option></select>
            <input type="text" className="input-app mb-4" placeholder="Nome da peça" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setModalPeca(false)} className="btn-secundario">Cancelar</button>
              <button onClick={() => setModalPeca(false)} className="btn-primario">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}