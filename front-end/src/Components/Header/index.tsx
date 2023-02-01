interface IHeaderProps {
  title: string;
}

export function Header({ title }: IHeaderProps) {
  return (
    <header className="w-screen h-20  flex items-center justify-center shadow-2xl shadow-white bg-red-900 ">
      <h1 className="text-4xl font-extrabold text-cyan-50">{title}</h1>
    </header>
  );
}
