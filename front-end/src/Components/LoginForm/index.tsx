export function LoginForm() {
  return (
    <div className="w-screen h-full flex justify-center bg-gradient-to-br from-zinc-900 to-red-900">
      <form
        action=""
        className="max-h-96 flex flex-col mt-12 bg-slate-300/30 p-6 rounded-lg shadow-2xl shadow-black"
      >
        <h2 className="self-center text-3xl mb-6 text-white font-bold">
          Login
        </h2>
        <label htmlFor="emailInput" className="text-white font-bold">
          E-mail
        </label>
        <input
          type="email"
          id="emailInput"
          className="mb-5 w-80 h-12 rounded-lg px-2 bg-slate-800 text-white"
        />
        <label htmlFor="passwordInput" className="text-white font-bold">
          Senha
        </label>
        <input
          type="password"
          id="passwordInput"
          className="mb-8 w-80 h-12 rounded-lg px-2 text-white bg-slate-800"
        />
        <button className="mb-5 w-80 h-12 rounded-lg bg-red-800 text-white font-bold hover:bg-red-600">
          Entrar
        </button>
        <a
          href="/"
          className="w-fit self-center text-white underline hover:font-bold"
        >
          Sou novo aqui
        </a>
      </form>
    </div>
  );
}
