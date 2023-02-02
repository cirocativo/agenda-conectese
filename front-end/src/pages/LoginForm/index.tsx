import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

interface ILoginFormValues {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required("E-mail obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

export function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>({
    resolver: yupResolver(schema),
  });

  const useLogin = (data: ILoginFormValues) => {
    navigate("/dashboard");
  };

  return (
    <div className="w-screen h-5/6 flex justify-center ">
      <form
        onSubmit={handleSubmit(useLogin)}
        className=" flex flex-col my-12 p-6 bg-slate-300/30 rounded-lg shadow-2xl shadow-black"
      >
        <h2 className="self-center text-3xl mb-6 text-white font-bold">
          Login
        </h2>
        <label className="text-white font-bold">
          E-mail
          <input
            type="email"
            className={`input
              ${errors.email ? " border-red-500" : ""}
            `}
            {...register("email")}
          />
          <span className="text-red-700 block animate-pulse-color-black">
            {errors.email?.message}
          </span>
        </label>

        <label className="label">
          Senha
          <input
            type="password"
            className={`input
              ${errors.password ? " border-red-500" : ""}
            `}
            {...register("password")}
          />
          <span className="text-red-700 block animate-pulse-color-black">
            {errors.password?.message}
          </span>
        </label>

        <button className="mb-5 mt-10 w-80 h-12 rounded-lg bg-red-800 text-white font-bold hover:bg-red-600">
          Entrar
        </button>
        <Link
          to="/register"
          className="w-fit self-center text-white underline hover:font-bold"
        >
          Sou novo aqui
        </Link>
      </form>
    </div>
  );
}
