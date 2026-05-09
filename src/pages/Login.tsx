export default function Login({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="h-screen w-full bg-slate-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">✈️ Aerocode</h1>
          <p className="text-slate-500 mt-2 text-sm">Gestão de Produção Aeroespacial</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="mb-4">
            <label className="label-campo">Usuário</label>
            <input type="text" defaultValue="admin" className="input-app" />
          </div>
          <div className="mb-6">
            <label className="label-campo">Senha</label>
            <input type="password" defaultValue="admin123" className="input-app" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition-colors">
            Entrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
}