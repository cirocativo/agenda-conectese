import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "yup-phone";
import { useUser } from "../../providers/User";

interface IRegisterFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  isAdm: boolean;
}

const schema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório"),
  phone: yup
    .string()
    .phone("BR", true, "Número inválido")
    .required("Telefone obrigatório"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .matches(/.{8,}/, "Deve conter ao menos 8 dígitos"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "A senha está diferente"),
});

export function RegisterForm() {
  const { createUser } = useUser();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormValues>({
    resolver: yupResolver(schema),
  });

  const registerUser = async (data: IRegisterFormValues) => {
    let { passwordConfirm, ...newUser } = data;
    newUser["isAdm"] = false;
    if (await createUser(newUser)) navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(registerUser)}
      className=" flex flex-col my-12 p-6 bg-slate-300/30 rounded-lg shadow-2xl shadow-black"
    >
      <h2 className="self-center text-3xl mb-6 text-white font-bold">
        Cadastro
      </h2>
      <label className="text-white font-bold">
        Nome Completo
        <input
          type="text"
          className={`input
              ${errors.name ? " border-red-500" : ""}
            `}
          {...register("name")}
        />
        <span className="text-red-700 block animate-pulse-color-black">
          {errors.name?.message}
        </span>
      </label>
      <label className="label text-white">
        E-mail{" "}
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

      <label className="label text-white">
        Telefone
        <input
          type="text"
          className={`input
              ${errors.phone ? " border-red-500" : ""}
            `}
          {...register("phone")}
        />
        <span className="text-red-700 inline animate-pulse-color-black">
          {errors.phone?.message}
        </span>
      </label>
      <label className="label text-white">
        Senha
        <input
          type="password"
          className={`input
              ${errors.password ? " border-red-500" : ""}
            `}
          {...register("password")}
        />
        <span className="text-red-700 inline animate-pulse-color-black">
          {errors.password?.message}
        </span>
      </label>
      <label className="label text-white">
        Confirmar Senha
        <input
          type="password"
          className={`input
              ${errors.passwordConfirm ? " border-red-500" : ""}
            `}
          {...register("passwordConfirm")}
        />
        <span className="text-red-700 inline animate-pulse-color-black">
          {errors.passwordConfirm?.message}
        </span>
      </label>
      <button className="mb-5 mt-10 w-80 h-12 rounded-lg bg-red-800 text-white font-bold hover:bg-red-600 transition-colors">
        Cadastrar
      </button>
      <Link
        to="/"
        className="w-fit self-center text-white underline hover:font-bold transition-all"
      >
        Já sou cadastrado
      </Link>
    </form>
  );
}
